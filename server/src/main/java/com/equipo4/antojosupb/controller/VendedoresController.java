package com.equipo4.antojosupb.controller;

import com.equipo4.antojosupb.dto.VendedorEstadoResponse;
import com.equipo4.antojosupb.services.VendedoresPublicosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/vendedores")
@CrossOrigin(origins = "*")
public class VendedoresController {

    @Autowired
    private VendedoresPublicosService vendedoresPublicosService;

    @GetMapping
    public ResponseEntity<List<VendedorEstadoResponse>> listarVendedores() {
        return ResponseEntity.ok(vendedoresPublicosService.listarVendedores());
    }
}
