package com.equipo4.antojosupb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VendedorEstadoResponse {
    private int idVendedor;
    private String nombreNegocio;
    private String nombreCategoria;
    private boolean activo;
    private String estado;
    private String colorTarjeta;
}
