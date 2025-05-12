import { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import type { Template } from "../types";
import { API_URL } from "../constants";
import CenteredCircularProgress from "./CenterdCircularProgress";

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>();

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch(API_URL + "templates");
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error("Error fetching templates: ", error);
      }
    };

    fetchTemplates();
  }, []);

  const handleAddTemplate = async () => {
    try {
      const response = await fetch(API_URL + "templates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "New Template",
          description: "Description of the new template",
          content: "Content of the new template",
        }),
      });
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error("Error fetching templates: ", error);
    }
  };

  return !templates ? (
    <CenteredCircularProgress />
  ) : (
    <>
      <TemplateCard
        isFakeCardForAdding
        key={-1}
        onSelectAction={handleAddTemplate}
      />
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onSelectEdit={() => {}}
          onSelectDelete={() => {}}
        />
      ))}
    </>
  );
}
