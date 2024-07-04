export interface Pet {
  id: string;
  name: string;
  speciesName: string;
  breedName: string;
  age: number;
  profilePhoto: string;
  photo: string;
  userId?: string; // Si es necesario
}
