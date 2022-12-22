package com.twitterdan.facade;


import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

public class GeneralFacade<E, D> {
  private final Class<E> entityClass;
  private final Class<D> dtoClass;
  private final ModelMapper modelMapper = new ModelMapper();

  public GeneralFacade(final Class<E> entityParametrClass, final Class<D> dtoParametrClass) {
    entityClass = entityParametrClass;
    dtoClass = dtoParametrClass;
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
  }

  public E convertToEntity(final D dto) {
    final E entity = modelMapper.map(dto, entityClass);
    decorateEntity(entity, dto);
    return entity;
  }

  public D convertToDto(final E entity) {
    final D dto = modelMapper.map(entity, dtoClass);
    decorateDto(dto, entity);
    return dto;
  }

  protected void decorateEntity(final E entity, final D dto) {
  }

  protected void decorateDto(final D dto, final E entity) {
  }

}
