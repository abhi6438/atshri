export function catOf(cats, id) {
  return cats.find(c => c.id === id) || cats[0] || { icon: '🎯', name: { en: 'General', hi: 'सामान्य' }, color: '#888' };
}
