package com.equipo4.antojosupb.services;

import com.equipo4.antojosupb.dto.VendedorEstadoResponse;
import com.equipo4.antojosupb.entities.Vendedor;
import com.equipo4.antojosupb.repository.VendedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VendedoresPublicosService {

    @Autowired
    private VendedorRepository vendedorRepository;

    @Autowired
    private HorarioVendedorService horarioVendedorService;

    @Transactional
    public List<VendedorEstadoResponse> listarVendedores() {
        List<Vendedor> vendedores = vendedorRepository.findAllByOrderByNombreNegocioAsc();
        return vendedores.stream()
                .map(vendedor -> {
                    boolean activo = horarioVendedorService.actualizarEstadoPorHorario(vendedor);
                    return toResponse(vendedor, activo);
                })
                .collect(Collectors.toList());
    }

    private static VendedorEstadoResponse toResponse(Vendedor vendedor, boolean activo) {
        return new VendedorEstadoResponse(
                vendedor.getIdVendedor(),
                vendedor.getNombreNegocio(),
                vendedor.getCategoriaVendedor() != null ? vendedor.getCategoriaVendedor().getNombreCategoria() : null,
                activo,
                activo ? "Abierto" : "Cerrado",
                activo ? "blanco-hueso" : "gris",
                vendedor.getWhatsAppLink(),
                vendedor.getDescripcionNeg());
    }

    @Transactional
    public List<VendedorEstadoResponse> listarRecomendados(int cantidad) {
        List<Vendedor> vendedores = vendedorRepository.findAll();
        Collections.shuffle(vendedores);
        return vendedores.stream()
                .limit(cantidad)
                .map(vendedor -> {
                    boolean activo = horarioVendedorService.actualizarEstadoPorHorario(vendedor);
                    return toResponse(vendedor, activo);
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public List<VendedorEstadoResponse> buscarVendedoresPorNombre(String nombre) {
        List<Vendedor> vendedores = vendedorRepository.findByNombreNegocioContainingIgnoreCase(nombre);
        return vendedores.stream()
                .map(vendedor -> {
                    boolean activo = horarioVendedorService.actualizarEstadoPorHorario(vendedor);
                    return toResponse(vendedor, activo);
                })
                .collect(Collectors.toList());
    }
}
