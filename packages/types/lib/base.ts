export type UUID = string;
export type URL = string;
export type ISO8601Date = string;

export type ObjectType =
  | "page"
  | "list"
  | "user"
  | "block"
  | "file"
  | "external"
  | "emoji";

export type BlockType =
  | "paragraph"
  | "heading_1"
  | "heading_2"
  | "heading_3"
  | "bulleted_list_item"
  | "numbered_list_item"
  | "to_do"
  | "toggle"
  | "code"
  | "child_page"
  | "child_database"
  | "embed"
  | "image"
  | "video"
  | "file"
  | "pdf"
  | "bookmark"
  | "callout"
  | "quote"
  | "equation"
  | "divider"
  | "table_of_contents"
  | "breadcrumb"
  | "column"
  | "column_list"
  | "unsupported";

export type PropertyType =
  | "rich_text"
  | "number"
  | "select"
  | "multi_select"
  | "date"
  | "formula"
  | "relation"
  | "rollup"
  | "title"
  | "people"
  | "files"
  | "checkbox"
  | "url"
  | "email"
  | "phone_number"
  | "created_time"
  | "created_by"
  | "last_edited_time"
  | "last_edited_by";

export type Color =
  | "default"
  | "gray"
  | "brown"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink";

export type CodeLanguage =
  | "abap"
  | "arduino"
  | "bash"
  | "basic"
  | "c"
  | "clojure"
  | "coffeescript"
  | "c++"
  | "c#"
  | "css"
  | "dart"
  | "diff"
  | "docker"
  | "elixir"
  | "elm"
  | "erlang"
  | "flow"
  | "fortran"
  | "f#"
  | "gherkin"
  | "glsl"
  | "go"
  | "graphql"
  | "groovy"
  | "haskell"
  | "html"
  | "java"
  | "javaSsript"
  | "json"
  | "julia"
  | "kotlin"
  | "latex"
  | "less"
  | "lisp"
  | "livescript"
  | "lua"
  | "makefile"
  | "markdown"
  | "markup"
  | "matlab"
  | "mermaid"
  | "nix"
  | "objective-c"
  | "ocaml"
  | "pascal"
  | "perl"
  | "php"
  | "plain text"
  | "powershell"
  | "prolog"
  | "protobuf"
  | "python"
  | "r"
  | "reason"
  | "ruby"
  | "rust"
  | "sass"
  | "scala"
  | "scheme"
  | "scss"
  | "shell"
  | "sql"
  | "swift"
  | "typescript"
  | "vb.net"
  | "verilog"
  | "vhdl"
  | "visual basic"
  | "webassembly"
  | "xml"
  | "yaml"
  | "java/c/c++/c#";
