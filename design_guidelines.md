# G-Wallet Design Guidelines

## Design Approach

**Selected Approach**: Design System + Fintech Reference Patterns

**Justification**: G-Wallet is a utility-focused financial application where security, clarity, and efficiency are paramount. We'll draw from established fintech leaders (Stripe, Revolut, Coinbase, Plaid) while implementing Material Design principles for data-rich components and Apple HIG for trust-building minimalism.

**Core Design Principles**:
1. **Trust Through Clarity**: Every element communicates security and professionalism
2. **Information Hierarchy**: Financial data presented in scannable, digestible formats
3. **Efficient Workflows**: Minimize clicks to core actions (send, receive, automate)
4. **Intelligent Guidance**: AI insights integrated naturally without overwhelming users
5. **Responsive Confidence**: Immediate visual feedback for all financial actions

---

## Typography System

**Font Families**:
- **Primary**: Inter (via Google Fonts) - for UI elements, data, labels
- **Display/Headings**: Inter SemiBold/Bold - maintains consistency while adding hierarchy
- **Monospace**: JetBrains Mono - for wallet addresses, transaction IDs, USDC amounts

**Type Scale**:
- **Hero Numbers** (Balance Display): text-5xl (48px), font-bold, tracking-tight
- **Primary Headings** (Section Titles): text-2xl (24px), font-semibold
- **Secondary Headings** (Card Headers): text-lg (18px), font-semibold
- **Body Text**: text-base (16px), font-normal
- **Captions** (Timestamps, Labels): text-sm (14px), font-medium
- **Micro Text** (Transaction IDs): text-xs (12px), font-mono

**Typography Hierarchy**:
- Balance amounts: Large, bold, prominent with subtle letter-spacing
- Transaction amounts: Medium weight with clear positive/negative indicators
- Descriptive text: Regular weight, optimized line-height (1.5-1.6)
- Labels/metadata: Uppercase, small, medium weight for clear categorization

---

## Layout System

**Spacing Primitives** (Tailwind units):
- **Core spacing set**: 2, 4, 6, 8, 12, 16, 24
- **Component padding**: p-4, p-6, p-8 (depending on component size)
- **Section spacing**: space-y-6, space-y-8 (vertical rhythm)
- **Card gaps**: gap-4, gap-6 (grid/flex layouts)

**Container Strategy**:
- **Dashboard Container**: max-w-7xl mx-auto (1280px max width)
- **Content Sections**: px-4 md:px-6 lg:px-8 (responsive padding)
- **Cards/Panels**: Individual max-widths based on content density

**Grid Layouts**:
- **Dashboard Overview**: 2-column grid (lg:grid-cols-2) for balance cards + quick actions
- **Transaction List**: Single column with full-width rows
- **Spending Insights**: 3-column grid (md:grid-cols-2 lg:grid-cols-3) for category cards
- **Settings/Automation**: 2-column form layout (lg:grid-cols-2)

**Vertical Rhythm**:
- Section headers: mb-6
- Card stacks: space-y-4
- Form groups: space-y-6
- Dashboard sections: py-8, space-y-8

---

## Component Library

### Navigation & App Shell

**Top Navigation Bar**:
- Fixed header with subtle shadow/border
- Left: G-Wallet logo + wordmark
- Center: Primary navigation tabs (Dashboard, Transactions, Insights, Automate, Settings)
- Right: Wallet selector dropdown + user avatar menu
- Height: h-16, with px-6 horizontal padding
- Tab styling: Underline indicator for active state, smooth transitions

**Sidebar Navigation** (Desktop Alternative):
- Fixed left sidebar (w-64) with main navigation
- Logo at top (p-6)
- Navigation items with icons + labels
- Active state: subtle background fill, left border accent
- Bottom section: User profile + settings

### Core Dashboard Components

**Balance Card** (Hero Component):
- Large card with prominent balance display
- USDC logo/icon at top-left
- "Total Balance" label (text-sm, uppercase, tracking-wide)
- Balance amount (text-5xl, font-bold)
- USD equivalent (text-lg, muted)
- Quick action buttons row (Send, Receive, Buy) with icons
- Subtle background gradient or pattern for visual interest
- Padding: p-8

**Wallet Address Display**:
- Monospace font for address
- Truncated middle format (0x1234...5678)
- Copy button with icon (inline)
- QR code generation option
- Toast notification on copy success

**Transaction List**:
- Full-width card with overflow-y-scroll
- Table/list hybrid layout:
  - Transaction icon (send/receive indicator)
  - Counterparty address (truncated) or description
  - Timestamp (relative: "2 hours ago")
  - Amount (right-aligned, monospace, positive/negative styling)
  - Status badge (completed, pending, failed)
- Row hover state: subtle background change
- Dividers between rows (border-b)
- Infinite scroll or pagination at bottom
- Empty state: Centered icon + "No transactions yet" message

**Quick Stats Row**:
- 4-column grid (grid-cols-2 lg:grid-cols-4)
- Small stat cards with:
  - Icon (top-left)
  - Label (text-sm, muted)
  - Value (text-2xl, font-semibold)
  - Change indicator (+5% from last month)
- Gap: gap-4

### AI Insights Components

**Spending Insights Dashboard**:
- Section header with "AI-Powered Insights" title + info icon
- Category breakdown cards in 3-column grid:
  - Category icon + name
  - Spending amount (bold)
  - Percentage of total
  - Mini progress bar showing proportion
  - Padding: p-4
- Time period selector (Last 7 days, 30 days, 90 days) as tab pills

**AI Recommendation Cards**:
- Highlighted card with distinct border/shadow
- AI icon/badge at top-left
- Recommendation title (text-lg, font-semibold)
- Description text (2-3 lines max)
- Action button (primary CTA)
- Dismissible close button (top-right)
- Subtle animation on card appearance

**Budget Visualization**:
- Horizontal progress bar showing spent vs. budget
- Category labels with amounts
- Warning indicators when approaching/exceeding limits
- Donut chart for category distribution (using Chart.js or similar)
- Interactive tooltips on hover

### Automation & Settings

**Automation Setup Cards**:
- Card-based interface for each automation type:
  - Recurring Payments
  - Bill Splitting
  - Auto-Save Rules
- Toggle switch for enable/disable (right-aligned)
- Configuration form fields (collapsed/expandable)
- Schedule selector (date/time pickers)
- Amount input with USDC formatting
- Save/Cancel button group

**Connected Accounts List**:
- List of linked payment methods
- Each item shows:
  - Payment method icon (card/wallet)
  - Last 4 digits or identifier
  - Primary badge if default
  - Remove/edit actions (icon buttons)
- "Add Payment Method" button at bottom

### Form Elements & Inputs

**Text Inputs**:
- Standard height: h-12
- Border with focus ring
- Padding: px-4
- Labels above inputs (text-sm, font-medium, mb-2)
- Helper text below (text-xs, muted)
- Error states: red border + error message

**Amount Inputs**:
- Large text size for visibility
- USDC symbol prefix
- Right-aligned for numerical clarity
- Real-time USD conversion display below
- Min/max validation indicators

**Buttons**:
- **Primary**: Solid fill, rounded-lg, px-6 py-3, font-semibold
- **Secondary**: Border only, same sizing
- **Icon Buttons**: Square (w-10 h-10), rounded, icon centered
- **CTA Buttons on Images**: Backdrop blur (backdrop-blur-md), semi-transparent background, white text
- All buttons: Smooth transitions, disabled states clearly indicated

**Dropdowns/Selects**:
- Custom styled to match design system
- Down chevron icon (right-aligned)
- Dropdown menu with subtle shadow
- Hover states for menu items

### Feedback & States

**Loading States**:
- Skeleton screens for transaction lists (pulsing rectangles)
- Spinner for button actions
- Progressive loading for large data sets

**Success Confirmations**:
- Toast notifications (top-right corner)
- Green checkmark icon + message
- Auto-dismiss after 4 seconds
- Slide-in animation

**Error Handling**:
- Inline error messages below inputs
- Alert banners for critical errors (top of page)
- Clear, actionable error text
- Retry buttons where applicable

**Empty States**:
- Centered layout with:
  - Illustrative icon (large, muted)
  - "No [items] yet" headline
  - Helpful description text
  - Primary action button

### Overlays & Modals

**Transaction Modal**:
- Centered overlay with backdrop blur
- Card-style content (max-w-md)
- Header with title + close button
- Transaction details in key-value pairs
- Action buttons at bottom (full-width or grouped)
- Padding: p-6, rounded-xl

**Confirmation Dialogs**:
- Small modal (max-w-sm)
- Warning icon for destructive actions
- Clear question/statement
- Two-button layout (Cancel, Confirm)

---

## Animations & Interactions

**Minimal Animation Strategy**:
- Smooth transitions for state changes (0.2s ease-in-out)
- Subtle hover effects on interactive elements (scale: 1.02, shadow increase)
- Slide-in for toast notifications
- Fade-in for loaded content
- NO decorative animations, focus on functional feedback

**Micro-interactions**:
- Button press: slight scale down (0.98)
- Copy success: brief checkmark animation
- Toggle switches: smooth slide transition
- Tab switching: underline animation

---

## Responsive Behavior

**Breakpoints**:
- Mobile: Base (< 768px) - single column, stacked layout
- Tablet: md (768px+) - 2-column grids emerge
- Desktop: lg (1024px+) - full multi-column layouts, sidebar option
- Large: xl (1280px+) - max-width constraints engaged

**Mobile Adaptations**:
- Top nav becomes hamburger menu
- Multi-column grids collapse to single column
- Transaction amounts remain right-aligned but in compact format
- Bottom navigation bar for primary actions (optional)
- Touch-friendly targets (min 44px height)

---

## Images

**No hero images required** - this is a dashboard application, not a marketing site.

**Icons**:
- Use Heroicons (via CDN) for UI icons - outline style for most, solid for active states
- Financial icons: wallet, credit card, trending up/down, clock, lightning bolt
- Action icons: send, receive, refresh, settings, menu, close
- Size variants: w-4 h-4 (small), w-5 h-5 (standard), w-6 h-6 (large)

**Avatar/Logo**:
- User avatar: circular, w-10 h-10 (nav), w-16 h-16 (profile)
- G-Wallet logo: Simple wordmark + icon combination

**Charts/Visualizations**:
- Use Chart.js or similar library for spending charts
- Donut charts for category breakdowns
- Line charts for spending trends over time
- Bar charts for comparative analysis