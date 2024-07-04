export interface VetVisit {
    id: number;
    date: string; // Puedes utilizar un string para representar fechas en formato ISO
    reason: string;
    notes: string;
    petId: number;
    userId: number;
  }