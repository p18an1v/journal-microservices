package com.journal.service;

import com.journal.entity.Journal;

import java.util.List;

public interface JournalService {

    Journal createJournal(Journal journal, Integer userId);

    List<Journal> getJournalsByUser(Integer userId);

    Journal getJournalById(Integer journalId);

    void deleteJournal(Integer journalId);

    Journal updateJournal(Integer journalId, Journal journal);
}
