export interface Hospital {
  name: string;
  district: string;
  province: string;
  level: "Referral" | "Provincial" | "District";
  phone: string;
  lat: number;
  lng: number;
}

export const rwandaHospitals: Hospital[] = [
  { 
    name: "Kigali University Teaching Hospital (CHUK)", 
    district: "Nyarugenge", 
    province: "Kigali",
    level: "Referral",
    phone: "+250 788 123 456",
    lat: -1.9536,
    lng: 30.0606
  },
  { 
    name: "King Faisal Hospital", 
    district: "Gasabo", 
    province: "Kigali",
    level: "Provincial",
    phone: "+250 788 234 567",
    lat: -1.9419,
    lng: 30.0866
  },
  { 
    name: "Butare University Teaching Hospital (CHUB)", 
    district: "Huye", 
    province: "Southern",
    level: "Referral",
    phone: "+250 788 345 678",
    lat: -2.5967,
    lng: 29.7400
  },
  { 
    name: "Ruhengeri Referral Hospital", 
    district: "Musanze", 
    province: "Northern",
    level: "Referral",
    phone: "+250 788 456 789",
    lat: -1.5021,
    lng: 29.6350
  },
  { 
    name: "Gisenyi District Hospital", 
    district: "Rubavu", 
    province: "Western",
    level: "District",
    phone: "+250 788 567 890",
    lat: -1.6804,
    lng: 29.2564
  },
  { 
    name: "Kibungo Referral Hospital", 
    district: "Ngoma", 
    province: "Eastern",
    level: "Referral",
    phone: "+250 788 678 901",
    lat: -2.1456,
    lng: 30.5300
  },
  { 
    name: "Muhanga District Hospital", 
    district: "Muhanga", 
    province: "Southern",
    level: "District",
    phone: "+250 788 789 012",
    lat: -2.0639,
    lng: 29.7475
  },
  { 
    name: "Rwamagana Provincial Hospital", 
    district: "Rwamagana", 
    province: "Eastern",
    level: "Provincial",
    phone: "+250 788 890 123",
    lat: -1.9482,
    lng: 30.4410
  },
  { 
    name: "Nyagatare District Hospital", 
    district: "Nyagatare", 
    province: "Eastern",
    level: "District",
    phone: "+250 788 901 234",
    lat: -1.4203,
    lng: 30.3325
  },
  { 
    name: "Kabgayi District Hospital", 
    district: "Muhanga", 
    province: "Southern",
    level: "District",
    phone: "+250 788 012 345",
    lat: -2.0411,
    lng: 29.7322
  },
];
