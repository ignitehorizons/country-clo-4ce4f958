import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { CC_LazyMap as CC_Map } from "@/components/CC_LazyMap";
import communityConfig from "@/config/communityConfig";

export const CC_Amenities = () => {
  const [selectedAmenity, setSelectedAmenity] = useState<number | null>(null);

  const amenities = [
    {
      id: 1,
      name: "Community Clubhouse",
      description:
        "Perfect for large gatherings, parties, and events. Includes full kitchen and seating for 50.",
      capacity: 50,
      hours: "8:00 AM - 10:00 PM",
      location: "Main Entrance",
      image:
        "https://vibe.filesafe.space/1775231453582117442/assets/72039310-5c50-446c-a806-04f7cd6973c1.jpg",
      status: "Available",
      fee: "$50 deposit",
    },
    {
      id: 2,
      name: "Tennis Court 1",
      description:
        "Regulation size hard court. Must bring own equipment. Maximum 2 hour reservation.",
      capacity: 4,
      hours: "Dawn to Dusk",
      location: "Recreation Area",
      image:
        "https://vibe.filesafe.space/1775231453582117442/assets/6ac147a1-5ace-442b-a6be-112b70e3735a.jpg",
      status: "Available",
      fee: "Free",
    },
    {
      id: 3,
      name: "BBQ Pavilion",
      description: "Covered pavilion with 2 large charcoal grills and 4 picnic tables.",
      capacity: 20,
      hours: "10:00 AM - 9:00 PM",
      location: "Lake Park",
      image:
        "https://vibe.filesafe.space/1775231453582117442/assets/dd404e79-f903-4511-9281-87af49fa93d8.jpg",
      status: "Available",
      fee: "Free",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold font-display text-bark mb-2">Amenity Booking</h1>
        <p className="text-lg text-text-light font-body">
          Reserve community facilities for your next event or activity
        </p>
      </div>

      {!selectedAmenity ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-start">
            {/* iPhone Mockup Wrapper */}
            <div
              className="relative w-full max-w-[320px] shadow-2xl rounded-[3.5rem] border-12 border-[#1a1a1a] overflow-hidden bg-cream lg:sticky lg:top-24"
              style={{
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0,0,0,0.1)",
              }}
            >
              {/* iPhone Notch */}
              <div className="absolute top-0 inset-x-0 h-6 bg-[#1a1a1a] w-[140px] mx-auto rounded-b-2xl z-20" />

              <CC_Map
                height="650px"
                zoom={15.4}
                pitch={0}
                bearing={0}
                initialLat={28.17375}
                initialLng={-82.4664}
                outlineGeoJson={{
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Polygon",
                    coordinates: [
                      [
                        [-82.4673, 28.1717],
                        [-82.465, 28.1717],
                        [-82.465, 28.1758],
                        [-82.4678, 28.1758],
                        [-82.4678, 28.1755],
                        [-82.4671, 28.1755],
                        [-82.4671, 28.1735],
                        [-82.4678, 28.1735],
                        [-82.4678, 28.1722],
                        [-82.4673, 28.1722],
                        [-82.4673, 28.1717],
                      ],
                    ],
                  },
                }}
                pins={[
                  {
                    id: 1,
                    lat: 28.1725,
                    lng: -82.466,
                    title: "Community Clubhouse",
                    color: communityConfig.brandColors.primary,
                  },
                  {
                    id: 2,
                    lat: 28.174,
                    lng: -82.4665,
                    title: "Tennis Court 1",
                    color: communityConfig.brandColors.primary,
                  },
                  {
                    id: 3,
                    lat: 28.175,
                    lng: -82.4655,
                    title: "BBQ Pavilion",
                    color: communityConfig.brandColors.primary,
                  },
                ]}
                onPinClick={(pin) => setSelectedAmenity(pin.id as number)}
                interactive={true}
                className="rounded-[2.5rem] border-none"
              />
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {amenities.map((amenity) => (
              <Card
                key={amenity.id}
                className="border-border shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                <div className="aspect-video w-full relative">
                  <img
                    src={amenity.image}
                    alt={amenity.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-primary hover:bg-white border-none shadow-xs backdrop-blur-xs">
                      {amenity.fee}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="font-display text-xl text-bark">{amenity.name}</CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2 text-text-light">
                    {amenity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grow space-y-3">
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <Users className="w-4 h-4" /> Capacity: {amenity.capacity}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <Clock className="w-4 h-4" /> {amenity.hours}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <MapPin className="w-4 h-4" /> {amenity.location}
                  </div>
                </CardContent>
                <CardFooter className="pt-4 border-t border-border/50">
                  <Button
                    className="w-full bg-primary text-white hover:bg-primary-light"
                    onClick={() => setSelectedAmenity(amenity.id)}
                  >
                    Check Availability
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-display text-bark">
              Book {amenities.find((a) => a.id === selectedAmenity)?.name}
            </h2>
            <Button variant="outline" onClick={() => setSelectedAmenity(null)}>
              Back to Amenities
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src={amenities.find((a) => a.id === selectedAmenity)?.image}
                  alt={amenities.find((a) => a.id === selectedAmenity)?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-bark">Facility Details</h3>
                <p className="text-text-light">
                  {amenities.find((a) => a.id === selectedAmenity)?.description}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <Users className="w-4 h-4 text-primary" />
                    <span>
                      Up to {amenities.find((a) => a.id === selectedAmenity)?.capacity} people
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{amenities.find((a) => a.id === selectedAmenity)?.hours}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-light">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{amenities.find((a) => a.id === selectedAmenity)?.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-cream rounded-xl p-6 border border-border/50 flex flex-col items-center justify-center text-center min-h-[400px]">
              {/* This is where the calendar integration would go once connected */}
              <CalendarIcon className="w-16 h-16 text-primary/40 mb-4" />
              <h3 className="text-xl font-bold font-display text-bark mb-2">
                Select a Date & Time
              </h3>
              <p className="text-text-light mb-6 max-w-sm">
                Choose your preferred date and time slot from the calendar to complete your
                reservation.
              </p>
              <Button className="bg-primary text-white hover:bg-primary-light" size="lg">
                View Availability
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CC_Amenities;
