import { use, useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";
import type { Template } from "../../types";
import { API_URL } from "../../constants";
import CenteredCircularProgress from "../ui/CenteredCircularProgress";
import TemplateCardEdit from "./TemplateCardEdit";

export default function TemplateCards() {
  const [templates, setTemplates] = useState<Template[]>();
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

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
          userId: "userId", // TODO : replace with actual userId
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const data = await response.json();
      setTemplates([...templates!, data]);
    } catch (error) {
      console.error("Error fetching templates: ", error);
    }
  };

  const handleEditTemplate = async (template: Template) => {
    try {
      const response = await fetch(API_URL + "templates/" + template._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(template),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const data = await response.json();
      setTemplates(
        templates!.map((t) => (t._id === data._id ? { ...t, ...data } : t))
      );
    } catch (error) {
      console.error("Error editing template: ", error);
    }
  };

  const handleDeleteTemplate = async (id: number | string) => {
    try {
      const response = await fetch(API_URL + "templates/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        setTemplates(templates?.filter((template) => template._id !== id));
      } else {
        console.error("Error deleting template: ", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting template: ", error);
    }
  };

  return !templates ? (
    <CenteredCircularProgress />
  ) : editingTemplate ? (
    <TemplateCardEdit
      template={editingTemplate}
      onClickBack={() => setEditingTemplate(null)}
      onClickSave={(template) => {
        handleEditTemplate(template);
        setEditingTemplate(null);
      }}
    />
  ) : (
    <>
      <TemplateCard
        isFakeCardForAdding
        key={-1}
        onSelectAction={handleAddTemplate}
      />
      {templates.map((template) => (
        <TemplateCard
          key={template._id}
          template={template}
          onSelectEdit={(template) => setEditingTemplate(template)}
          onSelectDelete={async (template) =>
            await handleDeleteTemplate(template._id)
          }
        />
      ))}
    </>
  );
}
