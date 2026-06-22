import {
  Card,
  Text,
} from 'react-native-paper';

export default function ScheduleCard({
  title,
  date,
}) {
  if (!date) return null;

  return (
    <Card style={{ marginBottom: 12 }}>
      <Card.Content>
        <Text variant="titleMedium">
          {title}
        </Text>

        <Text>
          {date}
        </Text>
      </Card.Content>
    </Card>
  );
}