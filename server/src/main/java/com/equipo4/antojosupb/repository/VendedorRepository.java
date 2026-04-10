package com.equipo4.antojosupb.repository;

import com.equipo4.antojosupb.entities.Vendedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendedorRepository extends JpaRepository<Vendedor, Integer> {
    boolean existsByNombreNegocio(String nombreNegocio);
}
