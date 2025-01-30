"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CompanyFormProps } from "./CompanyForm.types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UploadButton } from "@/utils/uploadthing";
import { formSchema } from "./CompanyForm.form";

export function CompanyForm(props: CompanyFormProps) {
  const { company } = props;
  const router = useRouter();
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: company.name || "",
      description: company.description || "",
      country: company.country || "",
      website: company.website || "",
      phone: company.phone || "",
      cif: company.cif || "",
      profileImage: company.profileImage || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/company/${company.id}`, values);
      toast({
        title: "Company updated!",
        description: "Your company information has been successfully updated.",
      });
      router.refresh();
    } catch (error) {
      console.error("Error updating company:", error);
      toast({
        title: "Something went wrong",
        description: "Failed to update the company. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input placeholder="Company name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="spain">Spain</SelectItem>
                      <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                      <SelectItem value="portugal">Portugal</SelectItem>
                      <SelectItem value="greece">Greece</SelectItem>
                      <SelectItem value="italy">Italy</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="www.sitio-web.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="(+54) 41241246" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cif"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CIF</FormLabel>
                  <FormControl>
                    <Input placeholder="B-1886" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <div>
                      {photoUploaded ? (
                        <p className="text-sm">Image uploaded!</p>
                      ) : (
                        <UploadButton
                          className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3"
                          {...field}
                          endpoint="profileImage"
                          onClientUploadComplete={(res) => {
                            form.setValue("profileImage", res?.[0].url);
                            setPhotoUploaded(true);
                          }}
                          onUploadError={(error: Error) => {
                            toast({
                              title: "Error uploading photo",
                              description: error.message,
                              variant: "destructive",
                            });
                          }}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description..."/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="mt-4">
            Edit Company
          </Button>
        </form>
      </Form>
    </>
  );
}
