import {Prec} from "@codemirror/state"
import {KeyBinding, keymap} from "@codemirror/view"
import {Language, LanguageSupport, LanguageDescription} from "@codemirror/language"
import {markdownLanguage, markdownWithCodeLanguages} from "./markdown"
import {insertNewlineContinueMarkup, deleteMarkupBackward} from "./commands"
export {markdownLanguage, insertNewlineContinueMarkup, deleteMarkupBackward}

/// A small keymap with Markdown-specific bindings. Binds Enter to
/// [`insertNewlineContinueMarkup`](#lang-markdown.insertNewlineContinueMarkup)
/// and Backspace to
/// [`deleteMarkupBackward`](#lang-markdown.deleteMarkupBackward).
export const markdownKeymap: readonly KeyBinding[] = [
  {key: "Enter", run: insertNewlineContinueMarkup},
  {key: "Backspace", run: deleteMarkupBackward}
]

/// Markdown language support.
export function markdown(config: {
  /// When given, this language will be used by default to parse code
  /// blocks.
  defaultCodeLanguage?: Language,
  /// A collection of language descriptions to search through for a
  /// matching language (with
  /// [`LanguageDescription.matchLanguageName`](#language.LanguageDescription^matchLanguageName))
  /// when a fenced code block has an info string.
  codeLanguages?: readonly LanguageDescription[],
  /// Set this to false to disable installation of the Markdown
  /// [keymap](#lang-markdown.markdownKeymap).
  addKeymap?: boolean
} = {}) {
  let {codeLanguages, defaultCodeLanguage, addKeymap = true} = config
  let language = codeLanguages || defaultCodeLanguage ? markdownWithCodeLanguages(codeLanguages || [], defaultCodeLanguage)
    : markdownLanguage
  return new LanguageSupport(language, addKeymap ? Prec.extend(keymap.of(markdownKeymap)) : [])
}
