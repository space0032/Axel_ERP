package com.axelerp.controller;

import com.axelerp.model.Invoice;
import com.axelerp.model.Transaction;
import com.axelerp.service.AccountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
public class AccountsController {
    
    @Autowired
    private AccountsService accountsService;
    
    // Transaction endpoints
    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return ResponseEntity.ok(accountsService.getAllTransactions());
    }
    
    @PostMapping("/transactions")
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        return ResponseEntity.ok(accountsService.createTransaction(transaction));
    }
    
    @GetMapping("/transactions/summary")
    public ResponseEntity<Map<String, Object>> getFinancialSummary() {
        return ResponseEntity.ok(accountsService.getFinancialSummary());
    }
    
    // Invoice endpoints
    @GetMapping("/invoices")
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(accountsService.getAllInvoices());
    }
    
    @GetMapping("/invoices/{id}")
    public ResponseEntity<Invoice> getInvoiceById(@PathVariable Long id) {
        return ResponseEntity.ok(accountsService.getInvoiceById(id));
    }
    
    @PostMapping("/invoices")
    public ResponseEntity<Invoice> createInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(accountsService.createInvoice(invoice));
    }
    
    @PutMapping("/invoices/{id}")
    public ResponseEntity<Invoice> updateInvoice(@PathVariable Long id, @RequestBody Invoice invoice) {
        return ResponseEntity.ok(accountsService.updateInvoice(id, invoice));
    }
    
    @GetMapping("/revenue")
    public ResponseEntity<Map<String, Object>> getRevenueReport() {
        return ResponseEntity.ok(accountsService.getRevenueReport());
    }
}
