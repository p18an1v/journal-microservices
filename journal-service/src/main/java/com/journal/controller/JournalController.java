package com.journal.controller;

import com.journal.dto.JournalRequestDTO;
import com.journal.dto.JournalResponseDTO;
import com.journal.entity.Journal;
import com.journal.service.JournalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/journals")
public class JournalController {

        private final JournalService journalService;

        public JournalController(JournalService journalService) {
                this.journalService = journalService;
        }

        // CREATE JOURNAL
        @PostMapping
        public ResponseEntity<JournalResponseDTO> createJournal(
                        @RequestBody @Valid JournalRequestDTO dto) {

                Journal journal = new Journal();
                journal.setTitle(dto.getTitle());
                journal.setContent(dto.getContent());
                journal.setUserId(dto.getUserId());

                Journal saved = journalService.createJournal(journal, dto.getUserId());

                JournalResponseDTO response = new JournalResponseDTO(
                                saved.getJournalId(),
                                saved.getTitle(),
                                saved.getContent(),
                                saved.getUserId());

                return new ResponseEntity<>(response, HttpStatus.CREATED);
        }

        // GET JOURNAL BY ID
        @GetMapping("/{id}")
        public ResponseEntity<JournalResponseDTO> getJournal(@PathVariable Integer id) {

                Journal journal = journalService.getJournalById(id);

                JournalResponseDTO response = new JournalResponseDTO(
                                journal.getJournalId(),
                                journal.getTitle(),
                                journal.getContent(),
                                journal.getUserId());

                return ResponseEntity.ok(response);
        }

        // GET JOURNALS BY USER
        @GetMapping("/user/{userId}")
        public ResponseEntity<List<JournalResponseDTO>> getJournalsByUser(
                        @PathVariable Integer userId) {

                List<JournalResponseDTO> journals = journalService.getJournalsByUser(userId)
                                .stream()
                                .map(j -> new JournalResponseDTO(
                                                j.getJournalId(),
                                                j.getTitle(),
                                                j.getContent(),
                                                j.getUserId()))
                                .toList();

                return ResponseEntity.ok(journals);
        }

        // DELETE JOURNAL
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteJournal(@PathVariable Integer id) {

                journalService.deleteJournal(id);
                return ResponseEntity.noContent().build();
        }

        // UPDATE JOURNAL
        @PutMapping("/{id}")
        public ResponseEntity<JournalResponseDTO> updateJournal(
                        @PathVariable Integer id,
                        @RequestBody Journal journal) {

                Journal updated = journalService.updateJournal(id, journal);

                JournalResponseDTO response = new JournalResponseDTO(
                                updated.getJournalId(),
                                updated.getTitle(),
                                updated.getContent(),
                                updated.getUserId());

                return ResponseEntity.ok(response);
        }
}
