package com.example.titlestorageservice.repository;

import com.example.titlestorageservice.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre,Long> {

}
