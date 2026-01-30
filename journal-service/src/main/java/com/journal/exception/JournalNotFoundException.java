package com.journal.exception;

public class JournalNotFoundException extends RuntimeException {

    public JournalNotFoundException(String message) {
        super(message);
    }

    public JournalNotFoundException(Integer journalId) {
        super("Journal not found with id: " + journalId);
    }
}
