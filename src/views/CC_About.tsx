import { CC_Layout } from "@/components/CC_Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Users, TreePine, Shield } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useMeta } from "@/hooks/useMeta";
import { CC_LazyMap as CC_Map } from "@/components/CC_LazyMap";
import communityConfig from "@/config/communityConfig";

export default function CC_About() {
  useScrollReveal();
  useMeta({
    title: "About | Country Close",
    description:
      "Learn about Country Close — a quiet community of 26 homes established in 1988 in Lutz, Florida. Our story, values, and what makes this neighborhood different.",
  });
  return (
    <CC_Layout>
      {/* Hero Section */}
      <section
        className="w-full flex items-center justify-center text-center px-4"
        style={{
          height: "400px",
          background: "linear-gradient(135deg, #2D5016 0%, #3D6B20 60%, #4A7C2F 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <span className="font-accent text-accent text-[20px] block mb-4">Lutz, Florida</span>
          <h1 className="font-display text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About Country Close
          </h1>
          <p className="text-white/90 font-body text-lg md:text-xl">
            Lutz, Florida · Established 1988 · 26 Homes
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal-on-scroll">
            <h2 className="text-3xl md:text-4xl font-display text-bark font-bold mb-6">
              A Quiet Community of Neighbors
            </h2>
            <div className="space-y-4 text-text-light font-body text-lg leading-relaxed">
              <p>
                Nestled in the heart of Lutz, Florida, Country Close is more than just a
                neighborhood—it's a community where families grow, friendships flourish, and nature
                is respected.
              </p>
              <p>
                Established with a vision of maintaining the natural beauty of the Florida landscape
                while providing a safe, welcoming environment for all residents, our community takes
                pride in its mature oak trees, spacious lots, and peaceful atmosphere.
              </p>
              <p>
                Whether you're enjoying a quiet evening walk under the canopy of trees or
                participating in one of our community events, Country Close offers a rare blend of
                privacy and connection.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl border border-border reveal-on-scroll stagger-2">
            <img
              src="https://vibe.filesafe.space/1775231453582117442/assets/6b2c95ff-bfb2-4f50-9fc0-a63ce19638cb.png"
              alt="Country Close Neighborhood"
              loading="lazy"
              className="w-full h-full object-cover transition-opacity duration-500"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-border">
        <div className="text-center mb-12 reveal-on-scroll">
          <span className="font-accent text-accent text-2xl block mb-2">Our Location</span>
          <h2 className="text-3xl md:text-4xl font-display text-bark font-bold">
            Neighborhood Map
          </h2>
          <p className="text-text-light font-body mt-4 max-w-2xl mx-auto">
            Conveniently located in Lutz, Florida, providing easy access to local amenities while
            maintaining a secluded, private atmosphere.
          </p>
        </div>
        <div className="reveal-on-scroll stagger-1">
          <CC_Map
            height="500px"
            zoom={15.5}
            pins={[
              {
                id: "center",
                lat: communityConfig.coordinates.lat,
                lng: communityConfig.coordinates.lng,
                title: "Country Close",
                color: communityConfig.brandColors.primary,
              },
            ]}
          />
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-4 md:px-8 bg-light-gray border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <span className="font-accent text-accent text-2xl block mb-2">Our Foundation</span>
            <h2 className="text-3xl md:text-4xl font-display text-bark font-bold">
              Community Values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-border shadow-xs hover:shadow-md transition-shadow reveal-on-scroll stagger-1">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mx-auto mb-6 text-primary">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-display text-bark font-bold mb-3">Connection</h3>
                <p className="text-text-light font-body">
                  We believe in looking out for one another and fostering meaningful relationships
                  between neighbors.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-border shadow-xs hover:shadow-md transition-shadow reveal-on-scroll stagger-2">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mx-auto mb-6 text-primary">
                  <TreePine size={32} />
                </div>
                <h3 className="text-xl font-display text-bark font-bold mb-3">Conservation</h3>
                <p className="text-text-light font-body">
                  Preserving the natural beauty, mature trees, and local wildlife of our Lutz
                  environment.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-border shadow-xs hover:shadow-md transition-shadow reveal-on-scroll stagger-3">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-cream flex items-center justify-center mx-auto mb-6 text-primary">
                  <Shield size={32} />
                </div>
                <h3 className="text-xl font-display text-bark font-bold mb-3">Tranquility</h3>
                <p className="text-text-light font-body">
                  Maintaining a peaceful, safe, and quiet atmosphere where everyone can relax and
                  feel at home.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </CC_Layout>
  );
}
