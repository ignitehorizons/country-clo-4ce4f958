import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dog, Cat, PawPrint, Rabbit, Hand } from "lucide-react";

const pets = [
  {
    id: 1,
    name: "Max",
    icon: <Dog className="w-16 h-16 text-primary" />,
    breed: "Golden Retriever",
    type: "Dog",
    owner: "Jeremy S.",
    location: "Country Close Dr",
  },
  {
    id: 2,
    name: "Luna",
    icon: <Cat className="w-16 h-16 text-primary" />,
    breed: "Domestic Shorthair",
    type: "Cat",
    owner: "Sarah M.",
    location: "Country Close Dr",
  },
  {
    id: 3,
    name: "Bella",
    icon: <Dog className="w-16 h-16 text-primary" />,
    breed: "Chihuahua",
    type: "Dog",
    owner: "Tom K.",
    location: "Country Close Dr",
  },
  {
    id: 4,
    name: "Cooper",
    icon: <Dog className="w-16 h-16 text-primary" />,
    breed: "Labrador Mix",
    type: "Dog",
    owner: "Linda R.",
    location: "Country Close Dr",
  },
  {
    id: 5,
    name: "Mittens",
    icon: <Cat className="w-16 h-16 text-primary" />,
    breed: "Maine Coon",
    type: "Cat",
    owner: "Mike J.",
    location: "Country Close Dr",
  },
  {
    id: 6,
    name: "Daisy",
    icon: <Dog className="w-16 h-16 text-primary" />,
    breed: "Beagle",
    type: "Dog",
    owner: "Amy P.",
    location: "Country Close Dr",
  },
  {
    id: 7,
    name: "Thumper",
    icon: <Rabbit className="w-16 h-16 text-primary" />,
    breed: "Holland Lop",
    type: "Other",
    owner: "Robert B.",
    location: "Country Close Dr",
  },
  {
    id: 8,
    name: "Rocky",
    icon: <Dog className="w-16 h-16 text-primary" />,
    breed: "German Shepherd",
    type: "Dog",
    owner: "Karen C.",
    location: "Country Close Dr",
  },
];

export function CC_Pets() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-bark">Pet Registry</h1>
          <p className="text-text-light mt-1">Meet the furry members of Country Close</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent-hover text-white rounded-full px-6 font-bold">
              + Register a Pet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl text-bark">
                Register Your Pet
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Pet Name</Label>
                <Input placeholder="E.g. Max" />
              </div>

              <div className="space-y-2">
                <Label>Species</Label>
                <Select defaultValue="Dog">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dog">Dog</SelectItem>
                    <SelectItem value="Cat">Cat</SelectItem>
                    <SelectItem value="Bird">Bird</SelectItem>
                    <SelectItem value="Rabbit">Rabbit</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Breed</Label>
                  <Input placeholder="E.g. Golden Retriever" />
                </div>
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input placeholder="E.g. 3 years" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Color / Description</Label>
                <Input placeholder="E.g. Light golden, white paws" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Friendly with kids?</Label>
                  <RadioGroup defaultValue="yes" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="kids-yes" />
                      <Label htmlFor="kids-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="kids-no" />
                      <Label htmlFor="kids-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label>Friendly with other pets?</Label>
                  <RadioGroup defaultValue="yes" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="pets-yes" />
                      <Label htmlFor="pets-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="pets-no" />
                      <Label htmlFor="pets-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Emergency Vet Contact (Optional)</Label>
                <Input placeholder="Clinic name & phone" />
              </div>

              <Button className="w-full bg-primary hover:bg-primary-light text-white font-bold mt-2">
                Register Pet
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-3">
        <div className="bg-white border border-border px-4 py-2 rounded-full text-sm font-bold text-bark shadow-xs flex items-center gap-1.5">
          <Dog className="w-4 h-4 text-primary" /> Dogs: 8
        </div>
        <div className="bg-white border border-border px-4 py-2 rounded-full text-sm font-bold text-bark shadow-xs flex items-center gap-1.5">
          <Cat className="w-4 h-4 text-primary" /> Cats: 4
        </div>
        <div className="bg-white border border-border px-4 py-2 rounded-full text-sm font-bold text-bark shadow-xs flex items-center gap-1.5">
          <PawPrint className="w-4 h-4 text-primary" /> Other: 2
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div className="h-[180px] bg-linear-to-br from-[#F7F3ED] to-[#E8A020]/20 flex items-center justify-center">
              {pet.icon}
            </div>

            <div className="p-5">
              <h3 className="font-display font-bold text-xl text-bark">{pet.name}</h3>

              <div className="flex items-center gap-2 mt-2">
                <span
                  className="text-[11px] font-bold text-white px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor:
                      pet.type === "Dog" ? "#8B6914" : pet.type === "Cat" ? "#6BA3BE" : "#7A6A5A",
                  }}
                >
                  {pet.type}
                </span>
                <span className="text-[13px] text-text-light">{pet.breed}</span>
              </div>

              <div className="mt-4 space-y-1">
                <p className="text-[13px] text-text-light">Owner: {pet.owner}</p>
                <p className="text-[12px] text-text-light">{pet.location}</p>
              </div>

              <hr className="border-border my-4" />

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full border-[#C0392B] text-[#C0392B] hover:bg-[#C0392B] hover:text-white font-bold text-xs h-8"
                >
                  Report Lost
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-full border-primary text-primary hover:bg-primary hover:text-white font-bold text-xs h-8 flex items-center gap-1"
                >
                  Say Hi <Hand className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
