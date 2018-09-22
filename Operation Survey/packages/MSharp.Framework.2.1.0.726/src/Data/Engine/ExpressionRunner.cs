namespace MSharp.Framework.Data
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Reflection;
    using System.Text;

    internal class ExpressionRunner<T> where T : IEntity
    {
        static bool ShouldRecordDynamicQueries = Config.Get<bool>("Data.Access.Log.Custom.Queries", defaultValue: false);
        static bool EnforceOptimizedQueries = Config.Get<bool>("Data.Access.Enforce.Optimized.Queries", defaultValue: false);
        static Dictionary<string, ExpressionRunner<T>> Cache = new Dictionary<string, ExpressionRunner<T>>();
        static List<string> CustomQueriesLog = new List<string>();
        private IList<Expression> DynamicExpressions = new List<Expression>();

        Expression<Func<T, bool>> Criteria;
        internal List<Criterion> Conditions;
        internal Func<T, bool> DynamicCriteria;
        bool ConvertedCompletely = true;

        public ExpressionRunner(Expression<Func<T, bool>> criteria)
        {
            // First time:
            Criteria = criteria;
            Evaluate();

            if (!ConvertedCompletely)
            {
                if (EnforceOptimizedQueries) throw new Exception("The specified criteria cannot be converted to SQL.");

                DynamicCriteria = GetDynamicCriteria(criteria);

                if (ShouldRecordDynamicQueries)
                    RecordCustomQuery(criteria);
            }
        }

        private Func<T, bool> GetDynamicCriteria(Expression<Func<T, bool>> criteria)
        {
            if (Conditions.None()) return criteria.Compile();

            var dynamicCriteria = DynamicExpressions.Skip(1).Aggregate<Expression, Expression<Func<T, bool>>>(
                    Expression.Lambda<Func<T, bool>>(DynamicExpressions.First(), criteria.Parameters), (lamda, expression) =>
                    {
                        return Expression.Lambda<Func<T, bool>>(Expression.AndAlso(lamda.Body, expression), criteria.Parameters);
                    });

            return dynamicCriteria.Compile();
        }

        void RecordCustomQuery(Expression<Func<T, bool>> criteria)
        {
            if (CustomQueriesLog.Contains(criteria.ToString()))
                return;

            CustomQueriesLog.Add(criteria.ToString());
            var sb = new StringBuilder();
            sb.AppendLine(criteria.ToString());
            var st = new StackTrace(true);

            for (int i = 0; i < st.FrameCount; i++)
            {
                var frame = st.GetFrame(i);
                var ns = frame.GetMethod().DeclaringType.Namespace;
                if (ns == "App" || ns.IsEmpty()) // null for web pages
                    sb.Append(frame.ToString());
            }

            sb.AppendLine("--------------");
            System.IO.File.AppendAllText(AppDomain.CurrentDomain.BaseDirectory + "Custom.Data.Access.Queries.txt", sb.ToString());
        }

        internal static ExpressionRunner<T> CreateRunner(Expression<Func<T, bool>> criteria)
        {
            return new ExpressionRunner<T>(criteria);
        }

        void Evaluate()
        {
            Conditions = new List<Criterion>();

            var unitExpressions = GetUnitExpressions((LambdaExpression)Criteria);

            foreach (var ex in unitExpressions)
            {
                var condition = ProcessCriteria(ex);

                if (condition != null)
                    Conditions.Add(condition);
                else
                {
                    DynamicExpressions.Add(ex);
                    ConvertedCompletely = false;
                }
            }
        }

        static IEnumerable<Expression> GetUnitExpressions(LambdaExpression expression)
        {
            return GetUnitExpressions(expression.Body);
        }

        static IEnumerable<Expression> GetUnitExpressions(Expression expression)
        {
            if (expression.NodeType == ExpressionType.AndAlso)
            {
                var binary = expression as BinaryExpression;

                return GetUnitExpressions(binary.Left).Concat(binary.Right);
            }

            else return new[] { expression };
        }

        static bool IsSimpleParameter(Expression expression)
        {
            if (expression is ParameterExpression)
                return true;

            if (expression is UnaryExpression && (expression.NodeType == ExpressionType.Convert))
                return true;

            return false;
        }

        static string GetPropertyExpression(MemberExpression memberInfo)
        {
            // Handle the member:
            var property = memberInfo.Member as PropertyInfo;
            if (property == null) return null;

            // Fix for overriden properties:
            try { property = memberInfo.Expression.Type.GetProperty(property.Name) ?? property; }
            catch { }

            if (CalculatedAttribute.IsCalculated(property)) return null;
            if (memberInfo.Expression.Type.IsNullable()) return property.Name;
            if (!property.DeclaringType.Implements<IEntity>()) return null;

            // Handle the "member owner" expression:
            if (IsSimpleParameter(memberInfo.Expression))
            {
                if (IsForeignKey(property))
                    return property.Name.TrimEnd(2);

                return property.Name;
            }
            else if (memberInfo.Expression is MemberExpression)
            {
                // The expression is itself a member of something.

                var parentProperty = GetPropertyExpression(memberInfo.Expression as MemberExpression);
                if (parentProperty == null)
                    return null;
                else
                    return $"{parentProperty}.{property.Name}";
            }
            else return null;
        }

        private static bool IsForeignKey(PropertyInfo property)
        {
            return property.Name.EndsWith("Id") && (property.PropertyType == typeof(Guid) || property.PropertyType == typeof(Guid?));
        }

        Criterion ProcessCriteria(Expression expression)
        {
            var binary = expression as BinaryExpression;
            if (binary != null)
            {
                if (binary.NodeType == ExpressionType.OrElse)
                {
                    var criterion = BinaryCriterion.From<T>(binary);

                    if (criterion?.IsConvertedCompletely == false)
                        ConvertedCompletely = false;

                    return criterion;
                }
            }
            return CreateCriterion(expression);
        }

        internal static Criterion CreateCriterion(Expression expression)
        {
            if (expression is BinaryExpression)
                return CreateCriterion(expression as BinaryExpression);

            if (expression is UnaryExpression)
                return CreateCriterion(expression as UnaryExpression);

            if (expression is MemberExpression)
                return CreateCriterion(expression as MemberExpression);

            if (expression is MethodCallExpression)
                return CreateCriterion(expression as MethodCallExpression);

            return null;
        }

        private static Criterion CreateCriterion(BinaryExpression expression)
        {
            if (expression.Left is MemberExpression)
                return CreateCriterion(expression, expression.Left as MemberExpression);

            else if (expression.Left is ParameterExpression)
                return new Criterion("ID", ToOperator(expression.NodeType), GetExpressionValue(expression.Right));

            else if (expression.Left is UnaryExpression)
            {
                var unary = expression.Left as UnaryExpression;
                var member = unary.Operand as MemberExpression;

                if (member == null /*|| !unary.IsLiftedToNull*/) return null;

                return CreateCriterion(expression, member);
            }
            else
                return null;
        }

        private static Criterion CreateCriterion(UnaryExpression expression)
        {
            if (expression.NodeType != ExpressionType.Not) return null;

            var member = expression.Operand as MemberExpression;
            if (member == null) return null;

            var property = GetPropertyExpression(member);

            if (property.IsEmpty()) return null;

            return new Criterion(property, FilterFunction.Is, false);
        }

        private static Criterion CreateCriterion(MemberExpression expression)
        {
            if (expression.NodeType != ExpressionType.MemberAccess)
                return null;

            var property = GetPropertyExpression(expression);

            if (property.IsEmpty()) return null;
            if (property == "HasValue")
            {
                // Changed at 27 /10/2016, following James J's refactoring of Expression Runner:
                // property = expression.Member?.Name;

                // To this:
                property = (expression.Expression as MemberExpression)?.Member?.Name;

                if (property.IsEmpty()) return null;
                return new Criterion(property, FilterFunction.IsNot, value: null);
            }

            if ((expression.Member as PropertyInfo).PropertyType != typeof(bool)) return null;

            // Only one property level is supported:
            return new Criterion(property, FilterFunction.Is, true);
        }

        private static Criterion CreateCriterion(MethodCallExpression expression)
        {
            return Criterion.From(expression, throwOnError: false);
        }

        private static Criterion CreateCriterion(BinaryExpression expression, MemberExpression member)
        {
            var property = GetPropertyExpression(member);

            if (property.IsEmpty()) return null;

            var value = GetExpressionValue(expression.Right);

            return new Criterion(property, ToOperator(expression.NodeType), value);
        }

        static object GetExpressionValue(Expression expression)
        {
            object result;

            result = ExtractExpressionValue(expression);

            if (result is Entity)
            {
                if ((result as IntEntity)?.IsNew == true) return null;
                return ((dynamic)result).ID;
            }
            else return result;
        }

        static object ExtractExpressionValue(Expression expression)
        {
            if (expression == null) return null;

            if (expression is ConstantExpression)
                return (expression as ConstantExpression).Value;

            if (expression is MemberExpression)
            {
                var memberExpression = expression as MemberExpression;
                var member = memberExpression.Member;

                if (member is PropertyInfo)
                    return (member as PropertyInfo).GetValue(ExtractExpressionValue(memberExpression.Expression));

                else if (member is FieldInfo)
                    return (member as FieldInfo).GetValue(ExtractExpressionValue(memberExpression.Expression));

                else
                    return CompileAndInvoke(expression);

            }
            else if (expression is MethodCallExpression)
            {
                var methodExpression = expression as MethodCallExpression;
                var method = (expression as MethodCallExpression).Method;

                var instance = ExtractExpressionValue(methodExpression.Object);

                return method.Invoke(instance, methodExpression.Arguments.Select(a => ExtractExpressionValue(a)).ToArray());
            }
            else
            {
                return CompileAndInvoke(expression);
            }
        }

        static object CompileAndInvoke(Expression expression)
        {
            if (EnforceOptimizedQueries)
                throw new Exception("The specified expression cannot be converted to SQL without compilation. Use simple data variables or properties in your lambda queries.");

            return Expression.Lambda(typeof(Func<>).MakeGenericType(expression.Type), expression).Compile().DynamicInvoke();
        }

        static FilterFunction ToOperator(ExpressionType type)
        {
            switch (type)
            {
                case ExpressionType.Equal:
                    return FilterFunction.Is;
                case ExpressionType.NotEqual:
                    return FilterFunction.IsNot;
                case ExpressionType.GreaterThan:
                    return FilterFunction.MoreThan;
                case ExpressionType.GreaterThanOrEqual:
                    return FilterFunction.MoreThanOrEqual;
                case ExpressionType.LessThan:
                    return FilterFunction.LessThan;
                case ExpressionType.LessThanOrEqual:
                    return FilterFunction.LessThanOrEqual;
                default: throw new NotSupportedException(type + " is still not supported.");
            }
        }
    }
}