using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Tourista.BLL.DataServices.Interfaces;
using Tourista.BLL.DTOs;
using Tourista.DAL.Entities.Model;
using Repository.Pattern.Repositories;
using Service.Pattern;

namespace Tourista.BLL.DataServices
{
    public class AboutTranslationService : Service<AboutTranslation>, IAboutTranslationService
    {
        public AboutTranslationService(IRepositoryAsync<AboutTranslation> repository) : base(repository)
        {
            _repository = repository;
        }
        public PagedResultsDto GetAllAbouts()
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query( ).Select(x => x.About).Count();
            var aaax = _repository.Query( ).Select().ToList();
            var About = _repository.Query(  ).Select(x => x.About)
                .OrderBy(x => x.AboutId).ToList();
            results.Data = Mapper.Map<List<About>, List<AboutDto>>(About);
            return results;
        }
        public PagedResultsDto GetAllAboutsTranslation(string language)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x => x.Language.ToLower() == language.ToLower()).Select(x => x.About).Count();
            var aaax = _repository.Query(x => x.Language.ToLower() == language.ToLower()).Select().ToList();
            var Aboutobj = _repository.Query(x => x.Language.ToLower() == language.ToLower()).Select(x => x.About)
                .OrderBy(x => x.AboutId).ToList();
            results.Data = Mapper.Map<List<About>, List<AboutDto>>(Aboutobj, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (About About in src)
                        {
                            About.AboutTranslations = About.AboutTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public PagedResultsDto GetAboutTranslationByAboutId(string language,long AboutId)
        {
            PagedResultsDto results = new PagedResultsDto();
            results.TotalCount = _repository.Query(x =>  x.Language.ToLower() == language.ToLower()  && x.AboutId == AboutId).Select(x => x.About).Count();
            var aaax = _repository.Query(x =>  x.Language.ToLower() == language.ToLower()).Select().ToList();
            var AboutObj = _repository.Query(x => x.Language.ToLower() == language.ToLower() && x.AboutId == AboutId).Select(x => x.About)
                .OrderBy(x => x.AboutId).ToList();
            results.Data = Mapper.Map<List<About>, List<AboutDto>>(AboutObj, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {
                        foreach (About About in src)
                        {
                            About.AboutTranslations = About.AboutTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();
                        }

                    }
                );
            });
            return results;
        }
        public AboutDto AboutTranslationByAboutId(string language, long AboutId)
        {
            var aaax = _repository.Query(x => x.Language.ToLower() == language.ToLower()).Select().ToList();
            var About = _repository.Query(x => x.Language.ToLower() == language.ToLower() && x.AboutId == AboutId).Select(x => x.About)
                .OrderBy(x => x.AboutId).FirstOrDefault();
            var results = Mapper.Map<About, AboutDto>(About, opt =>
            {
                opt.BeforeMap((src, dest) =>
                    {

                        src.AboutTranslations = src.AboutTranslations.Where(x => x.Language.ToLower() == language.ToLower()).ToList();


                    }
                );
            });
            return results;
        }
      

    }
}