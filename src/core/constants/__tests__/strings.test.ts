import { Strings } from '../strings';

describe('Strings', () => {
  it('exports expected common and dashboard labels', () => {
    expect(Strings.common.appName).toBe('Medplum Patient Portal');

    expect(Strings.common.loading).toBe('Loading...');
    expect(Strings.common.retry).toBe('Retry');
    expect(Strings.common.cancel).toBe('Cancel');
    expect(Strings.common.ok).toBe('OK');

    expect(Strings.dashboard.tabs.home).toBe('Home');
    expect(Strings.dashboard.tabs.messages).toBe('Messages');
    expect(Strings.dashboard.tabs.appointments).toBe('Appointments');

    expect(Strings.dashboard.cta.joinVideo).toBe('Join Video');
    expect(Strings.dashboard.cta.requestAppointment).toBe('Request an appointment');
    expect(Strings.dashboard.cta.sendMessage).toBe('Send message to care team');
  });
});
