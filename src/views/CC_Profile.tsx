import React, { useState } from "react";
import { CC_VisibilitySettings } from "@/components/CC_VisibilitySettings";
import { Camera, Mail, Phone, MapPin, Shield, Bell, Key, Eye, EyeOff } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";
import { TEST_RESIDENT_USER_ID } from "@/lib/supabaseClient";

export const CC_Profile = () => {
  const [directoryVisible, setDirectoryVisible] = useState(true);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl text-bark mb-2">My Profile</h1>
        <p className="font-body text-text-light text-lg">
          Manage your account and community presence
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Left Column - Profile Card */}
        <div className="w-full md:w-[35%] bg-white rounded-2xl p-8 border border-border shadow-xs sticky top-[100px] text-center">
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary to-primary-light flex items-center justify-center shadow-md">
              <span className="font-display font-bold text-3xl text-white">JS</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-accent border-2 border-white flex items-center justify-center hover:bg-accent-hover transition-colors shadow-xs">
              <Camera size={14} className="text-white" />
            </button>
          </div>

          <h2 className="font-display font-bold text-[22px] text-bark mt-4">Jeremy Sidlauskas</h2>

          <div className="inline-block bg-light-gray text-text-light font-body font-bold text-[11px] rounded-full px-3 py-1 mt-2">
            Community Resident
          </div>

          <p className="font-body text-[14px] text-text-light mt-3 flex items-center justify-center gap-1.5">
            <MapPin size={14} />
            Country Close Drive
          </p>

          <p className="font-body text-[12px] text-text-light mt-1">Member since April 2026</p>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">
            <div className="text-left">
              <Label className="font-body font-bold text-[12px] text-text-light flex items-center gap-1.5 mb-1">
                {directoryVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                Directory Visibility
              </Label>
              <p className="font-body text-[11px] text-text-light/70">
                {directoryVisible ? "Visible to neighbors" : "Hidden from neighbors"}
              </p>
            </div>
            <Switch checked={directoryVisible} onCheckedChange={setDirectoryVisible} />
          </div>
        </div>

        {/* Right Column - Settings Tabs */}
        <div className="w-full md:w-[65%]">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="w-full justify-start bg-white border border-border rounded-xl p-1 mb-6 h-auto">
              <TabsTrigger
                value="personal"
                className="font-body data-[state=active]:bg-light-gray data-[state=active]:text-bark py-2.5 px-4 rounded-lg"
              >
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="font-body data-[state=active]:bg-light-gray data-[state=active]:text-bark py-2.5 px-4 rounded-lg"
              >
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="font-body data-[state=active]:bg-light-gray data-[state=active]:text-bark py-2.5 px-4 rounded-lg"
              >
                Privacy
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="font-body data-[state=active]:bg-light-gray data-[state=active]:text-bark py-2.5 px-4 rounded-lg"
              >
                Security
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="personal"
              className="bg-white rounded-2xl p-8 border border-border shadow-xs"
            >
              <h3 className="font-display font-bold text-xl text-bark mb-6">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-body font-bold text-text">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    defaultValue="Jeremy"
                    className="bg-cream border-border focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-body font-bold text-text">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    defaultValue="Sidlauskas"
                    className="bg-cream border-border focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-body font-bold text-text">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="jeremy@example.com"
                    className="bg-cream border-border focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-body font-bold text-text">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="(555) 123-4567"
                    className="bg-cream border-border focus-visible:ring-primary"
                  />
                </div>
              </div>

              <h3 className="font-display font-bold text-xl text-bark mb-6">Emergency Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="emName" className="font-body font-bold text-text">
                    Contact Name
                  </Label>
                  <Input
                    id="emName"
                    placeholder="Enter name"
                    className="bg-cream border-border focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emPhone" className="font-body font-bold text-text">
                    Contact Phone
                  </Label>
                  <Input
                    id="emPhone"
                    type="tel"
                    placeholder="Enter phone"
                    className="bg-cream border-border focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-primary hover:bg-primary-light text-white font-body font-bold px-8">
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            <TabsContent
              value="notifications"
              className="bg-white rounded-2xl p-8 border border-border shadow-xs"
            >
              <h3 className="font-display font-bold text-xl text-bark mb-6">
                Notification Preferences
              </h3>

              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-body font-bold text-text mb-1">Community Announcements</h4>
                    <p className="font-body text-sm text-text-light">
                      Important updates from the HOA board and management.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-body font-bold text-text mb-1">Maintenance Alerts</h4>
                    <p className="font-body text-sm text-text-light">
                      Notifications about scheduled maintenance or outages.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-body font-bold text-text mb-1">Event Reminders</h4>
                    <p className="font-body text-sm text-text-light">
                      Reminders for upcoming community events and meetings.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-body font-bold text-text mb-1">Direct Messages</h4>
                    <p className="font-body text-sm text-text-light">
                      When a neighbor sends you a direct message.
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button className="bg-primary hover:bg-primary-light text-white font-body font-bold px-8">
                  Save Preferences
                </Button>
              </div>
            </TabsContent>

            <TabsContent
              value="privacy"
              className="bg-white rounded-2xl p-8 border border-border shadow-xs"
            >
              <CC_VisibilitySettings
                userId={TEST_RESIDENT_USER_ID}
                initial={{
                  address_visible: false,
                  unit_or_street_visible: false,
                  phone_visible: false,
                  email_visible: false,
                  photo_visible: false,
                  display_name_mode: "First Name + Last Initial",
                }}
              />
            </TabsContent>

            <TabsContent
              value="security"
              className="bg-white rounded-2xl p-8 border border-border shadow-xs"
            >
              <h3 className="font-display font-bold text-xl text-bark mb-6">Security Settings</h3>

              <div className="space-y-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="currentPass" className="font-body font-bold text-text">
                    Current Password
                  </Label>
                  <Input
                    id="currentPass"
                    type="password"
                    className="bg-cream border-border focus-visible:ring-primary max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPass" className="font-body font-bold text-text">
                    New Password
                  </Label>
                  <Input
                    id="newPass"
                    type="password"
                    className="bg-cream border-border focus-visible:ring-primary max-w-md"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPass" className="font-body font-bold text-text">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirmPass"
                    type="password"
                    className="bg-cream border-border focus-visible:ring-primary max-w-md"
                  />
                </div>
              </div>

              <div className="flex justify-start">
                <Button className="bg-primary hover:bg-primary-light text-white font-body font-bold px-8">
                  Update Password
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
