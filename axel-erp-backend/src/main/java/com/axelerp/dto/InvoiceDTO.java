package com.axelerp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceDTO {
    private Long id;
    private Long customerId;
    private String items;
    private BigDecimal totalAmount;
    private BigDecimal tax;
    private BigDecimal grandTotal;
    private String status;
    private LocalDate issuedDate;
    private LocalDate dueDate;
}
