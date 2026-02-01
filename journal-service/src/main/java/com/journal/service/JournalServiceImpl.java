package com.journal.service;

import com.journal.entity.Journal;
import com.journal.exception.JournalNotFoundException;
import com.journal.exception.UserNotFoundException;
import com.journal.repository.JournalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JournalServiceImpl implements JournalService {

    private final JournalRepository journalRepository;

    private final UserClient userClient;

    public JournalServiceImpl(JournalRepository journalRepository,
            UserClient userClient) {
        this.journalRepository = journalRepository;
        this.userClient = userClient;
    }

    @Override
    public Journal createJournal(Journal journal, Integer userId) {

        if (!userClient.userExists(journal.getUserId())) {
            throw new UserNotFoundException(journal.getUserId());
        }

        return journalRepository.save(journal);
    }

    @Override
    public List<Journal> getJournalsByUser(Integer userId) {
        return journalRepository.findByUserId(userId);
    }

    @Override
    public Journal getJournalById(Integer journalId) {
        return journalRepository.findById(journalId)
                .orElseThrow(() -> new JournalNotFoundException(journalId));
    }

    @Override
    public void deleteJournal(Integer journalId) {

        Journal journal = journalRepository.findById(journalId)
                .orElseThrow(() -> new JournalNotFoundException(journalId));

        journalRepository.delete(journal);
    }

    @Override
    public Journal updateJournal(Integer journalId, Journal journal) {
        Journal existing = journalRepository.findById(journalId)
                .orElseThrow(() -> new JournalNotFoundException(journalId));

        if (journal.getTitle() != null && !journal.getTitle().isEmpty()) {
            existing.setTitle(journal.getTitle());
        }

        if (journal.getContent() != null && !journal.getContent().isEmpty()) {
            existing.setContent(journal.getContent());
        }

        return journalRepository.save(existing);
    }
}
