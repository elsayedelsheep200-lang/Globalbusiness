"use client"

import { Globe, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { languages, languageConfig } from "@/lib/translations"

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-primary/30 bg-card hover:bg-primary/10 transition-colors"
        >
          <Globe className="h-4 w-4 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-card border-primary/30">
        <DropdownMenuLabel className="text-primary font-semibold">{t.selectLanguage}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary/20" />
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`cursor-pointer transition-colors ${
              language === lang ? "bg-primary/20 text-primary font-semibold" : "hover:bg-primary/10"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span>{languageConfig[lang].name}</span>
              {language === lang && <Check className="h-4 w-4 text-primary" />}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
