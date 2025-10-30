using AutoMapper;
using LuxuryJW.Core.DTOs;
using LuxuryJW.Core.Models;

namespace LuxuryJW.Application.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserResponse>();
        CreateMap<Bid, BidResponse>();
        CreateMap<Product, ProductResponse>();
        CreateMap<CreateProductRequest, Product>();
        CreateMap<UpdateProductRequest, Product>();
    }
}


