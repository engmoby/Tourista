﻿using Tourista.Common;
using Tourista.DAL.Entities.Model;

namespace Tourista.DAL.Migrations
{
    using System.Data.Entity.Migrations;

    internal sealed class Configuration : DbMigrationsConfiguration<Entities.TouristaContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(Entities.TouristaContext context)
        {


            context.Users.AddOrUpdate(new User
            {
                IsDeleted = false,
                IsActive = true,
                FullName = "Admin",
                Password = "ADX4VeuwJ0BAoXSOXntYdJQJoRd61V+N/TNePnJfu38=",
                Phone = "0411111111",
                Email = "admin@gmail.com",
                UserType = (int)Enums.UserType.Manager,
                TenantId = 1
            });



        }
    }

}
