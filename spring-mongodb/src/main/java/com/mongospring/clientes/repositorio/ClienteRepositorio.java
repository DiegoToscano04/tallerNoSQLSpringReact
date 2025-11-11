package com.mongospring.clientes.repositorio;

import org.springframework.stereotype.Repository;

import com.mongospring.clientes.modelo.Cliente;

import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface ClienteRepositorio extends MongoRepository<Cliente, String>{

}
