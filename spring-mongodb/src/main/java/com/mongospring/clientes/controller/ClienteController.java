package com.mongospring.clientes.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.mongospring.clientes.modelo.Cliente;
import com.mongospring.clientes.service.ClienteService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/clientes")
@AllArgsConstructor
public class ClienteController {
	private final ClienteService service;

	@GetMapping
	public List<Cliente> listarTodos(){
		return service.listar();
	}

	@GetMapping("/{id}")
	public Cliente obtenerPorId(@PathVariable String id){
		return service.buscarPorId(id);
	}

	@PostMapping
	public Cliente crear(@RequestBody Cliente cliente){
		return service.guardar(cliente);
	}

	@PutMapping("/{id}")
	public Cliente actualizar(@PathVariable String id, @RequestBody Cliente cliente){
		cliente.setId(id);
		return service.guardar(cliente);
	}

	@DeleteMapping("/{id}")
	public void eliminar(@PathVariable String id){
		service.eliminar(id);
	}
}
