package com.equipo4.antojosupb.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "VENDEDORES")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vendedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdVendedor")
    private int idVendedor;

    @Column(name = "NombreNegocio", nullable = false, unique = true, length = 150)
    private String nombreNegocio;

    @Column(name = "NombrePropietario", nullable = false, length = 150)
    private String nombrePropietario;

    @Column(name = "DescripcionNeg", columnDefinition = "NVARCHAR(MAX)")
    private String descripcionNeg;

    @Column(name = "ContactoVen", nullable = false, length = 120)
    private String contactoVen;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdCategoriaV", nullable = false)
    private CategoriaVendedor categoriaVendedor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "IdUser", nullable = false)
    private Usuario usuario;
}
