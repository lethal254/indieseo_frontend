"use client"

import Handlebars from "handlebars"
import React from "react"
import { ScrollArea } from "../ui/scroll-area"
import cvStore from "@/hooks/cvStore"
import { marked } from "marked" // Import markdown-to-HTML converter

const RenderTemplate = () => {
  const { cv } = cvStore((state) => state)

  // Convert markdown to HTML
  const markdownToHtml = (markdown: string) => marked(markdown)

  const hbr = `
  <div class="resume">
    <header class="header">
      <h1>{{personalDetails.firstName}} {{personalDetails.lastName}}</h1>
      <p>{{personalDetails.wantedJobTitle}}</p>
      <p>{{personalDetails.phone}}</p>
      <p>{{personalDetails.email}}</p>
      <p>{{personalDetails.city}}, {{personalDetails.country}}</p>
    </header>
    <section class="section">
      <h2>Professional Summary</h2>
      <div>{{{professionalSummary}}}</div> <!-- Use triple curly braces to render HTML -->
    </section>
    <section class="section">
      <h2>Experience</h2>
      <ul>
        {{#each experience}}
          <li>
            <h3>{{this.position}} at {{this.company}}</h3>
            <p class="duration">{{this.startDate}} - {{this.endDate}}</p>
            <p>{{this.description}}</p>
          </li>
        {{/each}}
      </ul>
    </section>
    <section class="section">
      <h2>Education</h2>
      <ul>
        {{#each education}}
          <li>
            <h3>{{this.degree}} at {{this.school}}</h3>
            <p class="duration">{{this.startDate}} - {{this.endDate}}</p>
            <p>{{this.description}}</p>
          </li>
        {{/each}}
      </ul>
    </section>
    <section class="section">
      <h2>Skills</h2>
      <ul class="skills">
        {{#each skills}}
          <li>{{this}}</li>
        {{/each}}
      </ul>
    </section>
    <section class="section">
      <h2>Certifications</h2>
      <ul>
        {{#each certifications}}
          <li>
            <h3>{{this.name}}</h3>
            <p>{{this.issuer}}</p>
            <p class="duration">{{this.date}}</p>
          </li>
        {{/each}}
      </ul>
    </section>
    <section class="section">
      <h2>Projects</h2>
      <ul>
        {{#each projects}}
          <li>
            <h3>{{this.name}}</h3>
            <p>{{this.description}}</p>
            <p><strong>Technologies:</strong> {{this.technologies}}</p>
          </li>
        {{/each}}
      </ul>
    </section>
    <section class="section">
      <h2>Languages</h2>
      <ul>
        {{#each languages}}
          <li>{{this}}</li>
        {{/each}}
      </ul>
    </section>
    <section class="section">
      <h2>Interests</h2>
      <ul>
        {{#each interests}}
          <li>{{this}}</li>
        {{/each}}
      </ul>
    </section>
  </div>
  `

  const css = `
  body {
    font-family: 'Georgia', serif;
    line-height: 1.6;
    color: #000;
    margin: 0;
    padding: 0;
  }

  .template-container {
    max-width: 800px;
    margin: auto;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 95vh; /* A4 height */
    overflow: auto; /* Enable scrolling if content exceeds container */
  }

  .resume {
    max-width: 100%;
    margin: 0;
    padding: 40px;
    background-color: #fff;
    border: 1px solid #e0e0e0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .header {
    text-align: center;
    margin-bottom: 40px;
  }

  .header h1 {
    margin: 0;
    font-size: 2em;
    font-weight: normal;
  }

  .header p {
    margin: 0;
    font-size: 1em;
    color: #555;
  }

  .section h2 {
    font-size: 1.5em;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 5px;
    margin-bottom: 20px;
    color: #333;
  }

  .section ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .section li {
    margin-bottom: 20px;
  }

  .section h3 {
    margin: 0;
    font-size: 1.2em;
    color: #333;
    font-weight: normal;
  }

  .section .duration {
    font-size: 0.9em;
    color: #999;
    margin-top: 5px;
  }

  .section p {
    margin: 5px 0;
    font-size: 1em;
    color: #555;
  }

  .skills, .certifications, .languages, .interests {
    display: flex;
    flex-wrap: wrap;
  }

  .skills li, .certifications li, .languages li, .interests li {
    margin-right: 20px;
    font-size: 1em;
    color: #555;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  .table th, .table td {
    border: 1px solid #e0e0e0;
    padding: 10px;
    text-align: left;
  }

  .table th {
    background-color: #f8f8f8;
    font-weight: normal;
  }

  .table td {
    font-size: 1em;
    color: #555;
  }

  .footer {
    text-align: center;
    margin-top: 40px;
  }

  .footer p {
    font-size: 0.9em;
    color: #999;
  }

  /* Add print styles */
@media print {
  body {
    margin: 0;
    padding: 0;
  }

  .resume {
    width: 210mm; /* A4 width */
    height: 297mm; /* A4 height */
    margin: 0;
    padding: 20mm; /* Padding for print */
    box-shadow: none; /* Remove box-shadow for print */
    border: none; /* Remove border for print */
    page-break-after: always; /* Ensure each section starts on a new page */
  }

  .header {
    text-align: center;
    margin-bottom: 20px; /* Reduced margin for print */
  }

  .section {
    page-break-inside: avoid; /* Prevent breaking sections in print */
    margin-bottom: 20px; /* Adjust spacing for print */
  }

  .section ul {
    padding-left: 0;
  }

  .section li {
    margin-bottom: 10px; /* Adjust list item spacing */
  }
  
  .footer {
    text-align: center;
    margin-top: 20px;
  }
}

  `

  const template = Handlebars.compile(hbr)
  const htmlString = template({
    ...cv,
    professionalSummary: cv?.professionalSummary
      ? markdownToHtml(cv.professionalSummary)
      : "",
  })

  return (
    <div className='min-h-[400px] w-full rounded-md cursor-pointer hover:shadow-md transition-all duration-150 template-container'>
      <style>{css}</style>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  )
}

export default RenderTemplate
