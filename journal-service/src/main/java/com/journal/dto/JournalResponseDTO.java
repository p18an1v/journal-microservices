package com.journal.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JournalResponseDTO {

    private Integer journalId;
    private String title;
    private String content;
    private Integer userId;
}
