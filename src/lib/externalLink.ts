/**
 * Atributos de um link: externos (http/https) abrem em outra aba. Links internos, "mailto:" e o
 * "#" de um placeholder NÃO: abrir uma aba em branco para um link que ainda não existe seria pior
 * que não fazer nada.
 *
 * `rel="noreferrer"` evita que a página aberta controle esta (window.opener) e vaze a origem.
 * Espalhe o resultado no elemento: `<a href={url} {...externalLinkProps(url)}>`.
 */
export function externalLinkProps(url: string) {
  return /^https?:\/\//.test(url) ? { target: '_blank', rel: 'noreferrer' } : {};
}
