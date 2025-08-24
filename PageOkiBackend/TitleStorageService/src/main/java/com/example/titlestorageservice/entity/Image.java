package com.example.titlestorageservice.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "images")
@Data
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "target_type", nullable = false)
    private String targetType; // title/cover/chapter/page

    @Column(name = "target_id")
    private Long targetId;

    @ManyToOne
    @JoinColumn(name = "chapter_id")
    private Chapter chapter;

    @Column(name = "page_number")
    private Integer pageNumber;

    @Column(nullable = false)
    private String key;

    @Column(nullable = false)
    private String filename;

    @Column(name = "content_type", nullable = false)
    private String contentType;

    @Column(nullable = false)
    private Integer size;

    private String checksum;

    private Short width;

    private Short height;

    @Column(name = "storage_url", nullable = false)
    private String storageUrl;
}