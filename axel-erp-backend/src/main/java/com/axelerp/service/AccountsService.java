package com.axelerp.service;

import com.axelerp.exception.ResourceNotFoundException;
import com.axelerp.model.Invoice;
import com.axelerp.model.Transaction;
import com.axelerp.repository.InvoiceRepository;
import com.axelerp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AccountsService {
    
    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private InvoiceRepository invoiceRepository;
    
    // Transaction methods
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
    
    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }
    
    public Map<String, Object> getFinancialSummary() {
        List<Transaction> transactions = transactionRepository.findAll();
        
        BigDecimal totalCredit = transactions.stream()
                .filter(t -> "CREDIT".equalsIgnoreCase(t.getType()))
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal totalDebit = transactions.stream()
                .filter(t -> "DEBIT".equalsIgnoreCase(t.getType()))
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalCredit", totalCredit);
        summary.put("totalDebit", totalDebit);
        summary.put("balance", totalCredit.subtract(totalDebit));
        summary.put("transactionCount", transactions.size());
        
        return summary;
    }
    
    // Invoice methods
    public List<Invoice> getAllInvoices() {
        return invoiceRepository.findAll();
    }
    
    public Invoice getInvoiceById(Long id) {
        return invoiceRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice", "id", id));
    }
    
    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepository.save(invoice);
    }
    
    public Invoice updateInvoice(Long id, Invoice invoiceDetails) {
        Invoice invoice = getInvoiceById(id);
        invoice.setCustomerId(invoiceDetails.getCustomerId());
        invoice.setItems(invoiceDetails.getItems());
        invoice.setTotalAmount(invoiceDetails.getTotalAmount());
        invoice.setTax(invoiceDetails.getTax());
        invoice.setGrandTotal(invoiceDetails.getGrandTotal());
        invoice.setStatus(invoiceDetails.getStatus());
        invoice.setIssuedDate(invoiceDetails.getIssuedDate());
        invoice.setDueDate(invoiceDetails.getDueDate());
        return invoiceRepository.save(invoice);
    }
    
    public Map<String, Object> getRevenueReport() {
        List<Invoice> invoices = invoiceRepository.findAll();
        
        BigDecimal totalRevenue = invoices.stream()
                .filter(i -> "PAID".equalsIgnoreCase(i.getStatus()))
                .map(Invoice::getGrandTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        BigDecimal pendingRevenue = invoices.stream()
                .filter(i -> "PENDING".equalsIgnoreCase(i.getStatus()) || "UNPAID".equalsIgnoreCase(i.getStatus()))
                .map(Invoice::getGrandTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        Map<String, Object> report = new HashMap<>();
        report.put("totalRevenue", totalRevenue);
        report.put("pendingRevenue", pendingRevenue);
        report.put("invoiceCount", invoices.size());
        
        return report;
    }
}
