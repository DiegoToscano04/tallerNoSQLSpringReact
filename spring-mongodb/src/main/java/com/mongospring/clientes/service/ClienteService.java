package com.mongospring.clientes.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mongospring.clientes.modelo.Cliente;
import com.mongospring.clientes.repositorio.ClienteRepositorio;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ClienteService {
	private final ClienteRepositorio clienteRepositorio;

	public List<Cliente> listar(){
		return clienteRepositorio.findAll();
	}

	public Cliente buscarPorId(String id){
		return clienteRepositorio.findById(id).orElse(null);
	}

	public Cliente guardar(Cliente cliente){
		return clienteRepositorio.save(cliente);
	}

	public void eliminar(String id){
		clienteRepositorio.deleteById(id);
	}
}
