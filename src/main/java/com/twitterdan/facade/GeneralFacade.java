package com.twitterdan.facade;


import com.twitterdan.domain.user.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

public class GeneralFacade<E, D> {
  private final Class<E> entityClass;
  private final Class<D> dtoClass;
  private final ModelMapper modelMapper = new ModelMapper();

  public GeneralFacade(final Class<E> eclass, final Class<D> dclass) {
    entityClass = eclass;
    dtoClass = dclass;
    modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
  }

  public E convertToEntity(final D dto) {
    final E entity = modelMapper.map(dto, entityClass);

    decorateEntity(entity, dto);

    return entity;
  }

  public E convertToEntity(final D dto, User user) {
    final E entity = modelMapper.map(dto, entityClass);

    decorateEntity(entity, dto, user);

    return entity;
  }

  public D convertToDto(final E entity) {
    final D dto = modelMapper.map(entity, dtoClass);

    decorateDto(dto, entity);

    return dto;
  }

  public D convertToDto(final E entity, User user) {
    final D dto = modelMapper.map(entity, dtoClass);

    decorateDto(dto, entity, user);

    return dto;
  }

  protected void decorateEntity(final E entity, final D dto) {

  }

  protected void decorateEntity(final E entity, final D dto, final User user) {

  }

  protected void decorateDto(final D dto, final E entity) {

  }

  protected void decorateDto(final D dto, final E entity, final User user) {

  }
}
