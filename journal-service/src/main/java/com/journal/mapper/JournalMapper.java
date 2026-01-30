package com.journal.mapper;


import com.journal.entity.Journal;
import com.journal.model.JournalModel;

public class JournalMapper {

    //entity -> model
    public JournalModel toModel(Journal journal) {
        return new JournalModel(
                journal.getJournalId(),
                journal.getTitle(),
                journal.getContent(),
                journal.getUserId()
        );
    }

    //model to entity
    public Journal toEntity(JournalModel model) {
        Journal journal = new Journal();
        journal.setJournalId(model.getJournalId());
        journal.setTitle(model.getTitle());
        journal.setContent(model.getContent());
        journal.setUserId(model.getUserId());
        return journal;
    }
}

