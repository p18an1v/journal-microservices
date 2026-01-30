package com.journal.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JournalModel {

    private Integer journalId;
    private String title;
    private String content;
    private Integer userId; // only user reference, not full entity
}