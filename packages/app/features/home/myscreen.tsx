import {
	Anchor,
	Button,
	H1,
	Paragraph,
	Separator,
	Sheet,
	Text,
	useToastController,
	XStack,
	YStack,
} from '@my/ui'
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useLink } from 'solito/link'
import * as FileSystem from 'expo-file-system'

export function HomeScreen() {
	const [changingText, setChangingText] = useState('not set')

	const contentTest = 'man this is a markdown file'

	const writeToMarkdown = async () => {
		const markdownContent = '# Hello World This is a sample markdown file.'

		// Requests permissions for external directory
		const permissions =
			await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

		if (permissions.granted) {
			// Gets SAF URI from response
			const uri = permissions.directoryUri

			// Gets all files inside of selected directory
			const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(uri)
			alert(`Files inside ${uri}:\n\n${JSON.stringify(files)}`)

			let fileUri = await FileSystem.StorageAccessFramework.createFileAsync(
				uri,
				'write.md',
				'application/markdown'
			)

			await FileSystem.StorageAccessFramework.writeAsStringAsync(fileUri, markdownContent)
		}
	}

	return (
		<>
			<Button onPress={() => setChangingText('you pressed the button!')} size="$6">
				New Timer
			</Button>
			<Text>{changingText}</Text>

			<Button onPress={writeToMarkdown} size="$6">
				Write Markdown
			</Button>

			<Text>{FileSystem.documentDirectory}</Text>
		</>
	)
}
