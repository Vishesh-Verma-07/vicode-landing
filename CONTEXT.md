# ViCode Website

Landing page that drives installation of ViCode and explains its features to terminal-first developers.

## Language

**ViCode**:
An interactive terminal AI coding agent that lives in the project directory.
_Avoid_: terminal agent alone, AI assistant, bot

**Terminal AI coding agent**:
The product category — an LLM that reads, edits, and runs code from the terminal.
_Avoid_: terminal agent, chatbot

**Terminal-first Developer**:
A solo developer who lives in bash/git and prefers CLI over GUI.
_Avoid_: user, generalist, team, enterprise

**TUI**:
ViCode's two-panel Ink interface with Chat Panel plus Usage Panel.
_Avoid_: dashboard, website, GUI

**Mode**:
Governs each turn — `build`, `discuss`, or `plan` — scoping which tools the model can see.
_Avoid_: modality, setting

**Blast Radius**:
What the model is allowed to touch without approval — in-project by default, sensitive/out-of-root only with approval.
_Avoid_: permissions, scope

**Copy-install CTA**:
The hero action that copies `npm install -g vicode-ai` to the clipboard.
_Avoid_: download button, signup

**Faked Terminal**:
A CSS landing-page component that simulates a ViCode session with typed animation, not a real session capture.
_Avoid_: demo video, GIF, asciinema
