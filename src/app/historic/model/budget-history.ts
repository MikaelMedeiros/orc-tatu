export class BudgetHistory {
    clientName: string | null;
    description: string | null;    
    draw: string | null;
    centimeter: number | null; 
    pricePerCentimeter: number | null;
    bodyLocals: string[] | null;
    styles: string[] | null;
    details: string[] | null;
    studioPercentage: number | null; 
    parkingCost: number | null; 
    materialCost: number | null; 
    creditCardFee: number | null; 

    constructor(clientName: string | null,
             description: string | null,                          
             draw: string | null,
             centimeter: number | null,         
             pricePerCentimeter: number | null,
             bodyLocals: string[] | null,
             styles: string[] | null,                    
             details: string[] | null,                   
             studioPercentage: number | null,
             parkingCost: number | null,
             materialCost: number | null, 
             creditCardFee: number | null ) {
        this.clientName = clientName;
        this.description = description;
        this.draw = draw;
        this.centimeter = centimeter;
        this.pricePerCentimeter = pricePerCentimeter;
        this.bodyLocals = bodyLocals;
        this.styles = styles;
        this.details = details;
        this.studioPercentage = studioPercentage;
        this.parkingCost = parkingCost;
        this.materialCost = materialCost;
        this.creditCardFee = creditCardFee
    }
}