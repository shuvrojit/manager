import { useState } from 'react';
import styled from 'styled-components';
import { User } from '../data/types';
import { users } from '../data/users';

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Section = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #3b82f6;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #3b82f6;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #3b82f6;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.25rem;
  font-weight: 500;
  &:hover {
    background-color: #2563eb;
  }
  &:focus {
    outline: none;
    ring: 2px;
    ring-color: #3b82f6;
    ring-offset: 2px;
  }
`;

const ProfileImage = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  object-fit: cover;
`;

const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151;
`;

const Checkbox = styled.input`
  &[type='checkbox'] {
    border-radius: 0.25rem;
    border-color: #3b82f6;
  }
`;

const TimeInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const TimeInput = styled(Input)`
  width: auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const timezones = [
  'UTC-12:00',
  'UTC-11:00',
  'UTC-10:00',
  'UTC-09:00',
  'UTC-08:00',
  'UTC-07:00',
  'UTC-06:00',
  'UTC-05:00',
  'UTC-04:00',
  'UTC-03:00',
  'UTC-02:00',
  'UTC-01:00',
  'UTC+00:00',
  'UTC+01:00',
  'UTC+02:00',
  'UTC+03:00',
  'UTC+04:00',
  'UTC+05:00',
  'UTC+06:00',
  'UTC+07:00',
  'UTC+08:00',
  'UTC+09:00',
  'UTC+10:00',
  'UTC+11:00',
  'UTC+12:00',
];

const UserProfilePage = () => {
  // For demo purposes, using the first user
  const [user, setUser] = useState<User>(users[0]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement save functionality
    console.log('Profile updated:', user);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.') as [keyof User, string];
      setUser((prev) => ({
        ...prev,
        [parent]: {
          ...((prev[parent] as Record<string, any>) || {}),
          [child]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        },
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <Container>
      <Title>User Profile</Title>
      <Form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <Section>
          <SectionTitle>Basic Information</SectionTitle>
          <Grid>
            <FormGroup>
              <Label>Profile Picture</Label>
              <ImageUploadContainer>
                <ProfileImage src={imagePreview || user.avatar} alt={user.name} />
                <Input type="file" accept="image/*" onChange={handleImageChange} />
              </ImageUploadContainer>
            </FormGroup>

            <div>
              <FormGroup>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Work Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Personal Email</Label>
                <Input
                  type="email"
                  name="personalEmail"
                  value={user.personalEmail || ''}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </div>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Contact Information</SectionTitle>
          <Grid>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                type="tel"
                name="phoneNumber"
                value={user.phoneNumber || ''}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={user.location || ''}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>Timezone</Label>
              <Select name="timezone" value={user.timezone || ''} onChange={handleInputChange}>
                <option value="">Select Timezone</option>
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </Select>
            </FormGroup>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Professional Information</SectionTitle>
          <FormGroup>
            <Label>About</Label>
            <TextArea
              name="about"
              value={user.about || ''}
              onChange={handleInputChange}
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </FormGroup>

          <Grid>
            <FormGroup>
              <Label>GitHub Profile</Label>
              <Input
                type="url"
                name="github"
                value={user.github || ''}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
              />
            </FormGroup>

            <FormGroup>
              <Label>LinkedIn Profile</Label>
              <Input
                type="url"
                name="linkedin"
                value={user.linkedin || ''}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/username"
              />
            </FormGroup>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>Working Preferences</SectionTitle>
          <Grid>
            <FormGroup>
              <Label>Preferred Working Hours</Label>
              <TimeInputContainer>
                <TimeInput
                  type="time"
                  name="preferredWorkingHours.start"
                  value={user.preferredWorkingHours?.start || '09:00'}
                  onChange={handleInputChange}
                />
                <span>to</span>
                <TimeInput
                  type="time"
                  name="preferredWorkingHours.end"
                  value={user.preferredWorkingHours?.end || '17:00'}
                  onChange={handleInputChange}
                />
              </TimeInputContainer>
            </FormGroup>

            <FormGroup>
              <Label>Communication Preferences</Label>
              <div>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    name="communicationPreferences.slackNotifications"
                    checked={user.communicationPreferences?.slackNotifications || false}
                    onChange={handleInputChange}
                  />
                  <span>Slack Notifications</span>
                </CheckboxLabel>
                <CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    name="communicationPreferences.emailNotifications"
                    checked={user.communicationPreferences?.emailNotifications || false}
                    onChange={handleInputChange}
                  />
                  <span>Email Notifications</span>
                </CheckboxLabel>
              </div>
            </FormGroup>
          </Grid>
        </Section>

        <ButtonContainer>
          <Button type="submit">Save Changes</Button>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

export default UserProfilePage;
