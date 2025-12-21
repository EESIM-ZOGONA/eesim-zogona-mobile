# UI Design Guidelines - EE/SIM Zogona App

## Principes fondamentaux

### 1. Formes
- **Inputs & Boutons**: Toujours `borderRadius.full` (full rounded / pill shape)
- **Cards & Conteneurs**: `borderRadius.xl` ou `borderRadius.lg`
- **Badges & Tags**: `borderRadius.full`
- **Pas de borders visibles** sur les inputs - utiliser uniquement le contraste de couleur

### 2. Couleurs
- **Background page**: `colors.background` (#f3f4f6) - gris clair
- **Surface/Cards**: `colors.surface` (#ffffff) - blanc
- **Primary**: `colors.primary` (#030a7f) - bleu foncé
- **Primary Light**: `colors.primaryLight` (#eef0ff) - bleu très clair pour backgrounds

### 3. Inputs
- Background: `colors.surface` (blanc) ou `colors.surfaceLight` selon contexte
- Pas de border visible
- Border radius: `borderRadius.full`
- Height: 52-56px
- Focus state: légère ombre ou changement de background subtil
- Placeholder: `colors.text.tertiary`

### 4. Boutons primaires
- Utiliser `LinearGradient` avec `['#030a7f', '#020866']`
- Border radius: `borderRadius.full`
- Height: 52-56px
- Texte blanc, `fontFamily.bold`

### 5. Typography
- **Minimum font size**: `fontSize.sm` (14px) - JAMAIS utiliser `fontSize.xs` pour du texte lisible
- Titres: `fontFamily.bold`
- Corps: `fontFamily.regular` ou `fontFamily.medium`
- Labels: `fontFamily.semibold`

### 6. Espacements
- Padding horizontal pages: `spacing.xl` (20px)
- Gap entre éléments: `spacing.md` à `spacing.lg`
- Margin bottom sections: `spacing.xl` à `spacing.xxl`

### 7. Headers
- **Compact**: Pas de grands headers avec gradient qui prennent trop de place
- Back button: cercle 44x44, `borderRadius: 22`, background subtil
- Titre centré ou aligné avec actions à droite

### 8. Shadows
- Utiliser `shadows.sm` pour cards et éléments surélevés
- Pas d'ombres trop prononcées

### 9. États
- Loading: Skeleton loaders préférés aux spinners traditionnels
- Disabled: opacity 0.5-0.7
- Error: `colors.error` pour texte, pas de border rouge

### 10. Composants spécifiques

#### Phone Input (Login)
- Un seul bloc unifié full rounded
- Drapeau + code pays à gauche
- Séparateur vertical subtil (1px, hauteur ~28px)
- Input à droite
- Pas de border, juste contraste avec background

#### OTP Input
- Cases individuelles full rounded
- Background blanc
- Pas de border visible
- État focus: background `primaryLight`
- État rempli: background `primaryLight`

### 11. Icônes
- Taille standard: 20-24px
- Couleur: `colors.text.primary` ou `colors.text.secondary`
- Dans boutons: même couleur que le texte
