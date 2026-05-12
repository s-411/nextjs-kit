/* canvas.jsx — Chasing Optimum redesigns on a design canvas.
   Each artboard hosts one iPhone frame containing a redesigned screen.
   Add new artboards as we work through the remaining 50–60 screens.

   NOTE: DCSection filters children by exact type === DCArtboard, so we
   inline DCArtboard directly here (no wrapper component). */

const noop = () => {};
const W = 402, H = 874;

const Phone = ({ children }) => (
  <IOSDevice width={W} height={H} dark={true}>{children}</IOSDevice>
);

const CanvasApp = () => (
  <DesignCanvas>
    <DCSection
      id="onboarding"
      title="Onboarding"
      subtitle="Splash · Welcome · Sign In · Create Account"
    >
      <DCArtboard id="01-splash" label="01 · Splash" width={W} height={H}>
        <Phone><SplashScreen onTap={noop} /></Phone>
      </DCArtboard>

      <DCArtboard id="02-welcome" label="02 · Welcome" width={W} height={H}>
        <Phone><WelcomeScreen onCreate={noop} onLogin={noop} /></Phone>
      </DCArtboard>

      <DCArtboard id="03-signin" label="03 · Sign in with email" width={W} height={H}>
        <Phone><SignInScreen onBack={noop} onContinue={noop} /></Phone>
      </DCArtboard>

      <DCArtboard id="04-create" label="04 · Create an account" width={W} height={H}>
        <Phone><CreateAccountScreen onBack={noop} onContinue={noop} /></Phone>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="tour"
      title="Feature Tour"
      subtitle="Daily Reminders states · Track Progress"
    >
      <DCArtboard id="05-reminders" label="05 · Daily Reminders" width={W} height={H}>
        <Phone><DailyRemindersScreen onNext={noop} onCta={noop} /></Phone>
      </DCArtboard>

      <DCArtboard id="06-reminders-ios" label="06 · Reminders · iOS prompt" width={W} height={H}>
        <Phone><DailyRemindersIOSPromptScreen onNext={noop} /></Phone>
      </DCArtboard>

      <DCArtboard id="07-reminders-modal" label="07 · Reminders · In-app modal" width={W} height={H}>
        <Phone><DailyRemindersModalScreen onNext={noop} /></Phone>
      </DCArtboard>

      <DCArtboard id="08-reminders-enabled" label="08 · Reminders · Enabled" width={W} height={H}>
        <Phone><DailyRemindersEnabledScreen onNext={noop} /></Phone>
      </DCArtboard>

      <DCArtboard id="09-track-progress" label="09 · Track Progress" width={W} height={H}>
        <Phone><TrackProgressScreen onNext={noop} /></Phone>
      </DCArtboard>

      <DCArtboard id="10-daily-rules" label="10 · Daily Rules" width={W} height={H}>
        <Phone><DailyRulesScreen onNext={noop} /></Phone>
      </DCArtboard>

      <DCArtboard id="11-easy-sharing" label="11 · Easy Sharing" width={W} height={H}>
        <Phone><EasySharingScreen onNext={noop} /></Phone>
      </DCArtboard>

      <DCArtboard id="12-progress-check" label="12 · Progress Check" width={W} height={H}>
        <Phone><ProgressCheckScreen onFresh={noop} onContinue={noop} /></Phone>
      </DCArtboard>
    </DCSection>

    <DCSection id="home" title="Home" subtitle="Welcome to 75 Hard">
      <DCArtboard id="13-home" label="13 · Home" width={W} height={H}>
        <Phone><HomeScreen onStart={noop} /></Phone>
      </DCArtboard>

      <DCArtboard id="14-podcast-sheet" label="14 · Home · Podcast source" width={W} height={H}>
        <Phone><PodcastSourceSheet /></Phone>
      </DCArtboard>

      <DCArtboard id="15-start-modal" label="15 · Home · Start Day 1" width={W} height={H}>
        <Phone><StartDay1Modal /></Phone>
      </DCArtboard>

      <DCArtboard id="31-home-completed" label="31 · Home · Day 1 completed" width={W} height={H}>
        <Phone><HomeCompletedScreen /></Phone>
      </DCArtboard>
    </DCSection>

    <DCSection id="day1" title="Day 1" subtitle="Daily checklist">
      <DCArtboard id="16-day1" label="16 · Day 1" width={W} height={H}>
        <Phone><Day1Screen onOpenReminder={noop} /></Phone>
      </DCArtboard>

      <DCArtboard id="17-day1-reminder" label="17 · Day 1 · Reminder" width={W} height={H}>
        <Phone><Day1ReminderSheet /></Phone>
      </DCArtboard>

      <DCArtboard id="18-day1-time-picker" label="18 · Day 1 · Reminder time picker" width={W} height={H}>
        <Phone><Day1ReminderTimePickerSheet /></Phone>
      </DCArtboard>

      <DCArtboard id="22-day1-reminder-all" label="22 · Day 1 · Reminder (all days)" width={W} height={H}>
        <Phone><Day1ReminderAllDaysSheet /></Phone>
      </DCArtboard>

      <DCArtboard id="23-day1-add-pic" label="23 · Day 1 · Add Progress Pic" width={W} height={H}>
        <Phone><AddProgressPicSheet /></Phone>
      </DCArtboard>

      <DCArtboard id="27-day1-saved" label="27 · Day 1 · Image saved" width={W} height={H}>
        <Phone><Day1SavedToastScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="28-day1-share-card" label="28 · Day 1 · Share card" width={W} height={H}>
        <Phone><Day1ShareCardScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="29-day1-share-sheet" label="29 · Day 1 · iOS share sheet" width={W} height={H}>
        <Phone><Day1ShareCardShareSheet /></Phone>
      </DCArtboard>

      <DCArtboard id="30-day1-notes" label="30 · Day 1 · Notes editor" width={W} height={H}>
        <Phone><Day1NotesEditorScreen /></Phone>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="paywall"
      title="Paywall"
      subtitle="Choose Your Plan · App Store · Success"
    >
      <DCArtboard id="19-paywall" label="19 · Choose Your Plan" width={W} height={H}>
        <Phone><PaywallScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="20-paywall-appstore" label="20 · Paywall · App Store sheet" width={W} height={H}>
        <Phone><PaywallAppStoreSheet /></Phone>
      </DCArtboard>

      <DCArtboard id="21-paywall-success" label="21 · Paywall · Success" width={W} height={H}>
        <Phone><PaywallSuccessModal /></Phone>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="progress-pic"
      title="Progress Picture"
      subtitle="Photo picker · Library access · Confirm"
    >
      <DCArtboard id="24-photo-picker" label="24 · Photo picker" width={W} height={H}>
        <Phone><PhotoPickerScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="25-photo-prompt" label="25 · Photo library access" width={W} height={H}>
        <Phone><PhotoLibraryPromptScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="26-photo-confirm" label="26 · Use this image" width={W} height={H}>
        <Phone><PhotoConfirmScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="35-photos-albums" label="35 · Photos · Albums" width={W} height={H}>
        <Phone><PhotosAlbumListScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="36-photos-recents" label="36 · Photos · Recents grid" width={W} height={H}>
        <Phone><RecentsGridScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="37-photo-crop" label="37 · Photo crop" width={W} height={H}>
        <Phone><PhotoCropScreen /></Phone>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="share-ig"
      title="Share & IG Story"
      subtitle="IG story view · Share or edit sheet"
    >
      <DCArtboard id="32-ig-story" label="32 · IG Story view" width={W} height={H}>
        <Phone><IGStoryScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="33-share-edit" label="33 · Share or Edit Day 1" width={W} height={H}>
        <Phone><ShareOrEditDay1Sheet /></Phone>
      </DCArtboard>
    </DCSection>

    <DCSection
      id="settings"
      title="Settings"
      subtitle="Edit Profile & Settings"
    >
      <DCArtboard id="34-settings" label="34 · Edit Profile & Settings" width={W} height={H}>
        <Phone><SettingsScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="38-day-end-time" label="38 · Edit End-of-Day Time" width={W} height={H}>
        <Phone><EditDayEndTimeScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="39-settings-extended" label="39 · Settings · Continued" width={W} height={H}>
        <Phone><SettingsExtendedScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="40-settings-dark" label="40 · Settings · Dark theme" width={W} height={H}>
        <Phone><SettingsDarkScreen /></Phone>
      </DCArtboard>

      <DCArtboard id="41-delete-account" label="41 · Delete Account confirm" width={W} height={H}>
        <Phone><DeleteAccountConfirmModal /></Phone>
      </DCArtboard>
    </DCSection>

    {/* Add new sections below as we map the rest of the app.
        Pattern:

        <DCSection id="dashboard" title="Daily Check-in">
          <DCArtboard id="05-..." label="05 · ..." width={W} height={H}>
            <Phone><YourScreen /></Phone>
          </DCArtboard>
        </DCSection>
    */}
  </DesignCanvas>
);

ReactDOM.createRoot(document.getElementById('root')).render(<CanvasApp />);
