import { Button, Text } from '@my/ui'
import { useEffect, useState } from 'react'

export function TimerItem() {
	const [isPaused, setIsPaused] = useState(true)

	const [startTime, setStartTime] = useState(Date.now())
	const [elapsedTime, setElapsedTime] = useState(0)

	const [seconds, setSeconds] = useState(0)
	const [minutes, setMinutes] = useState(0)
	const [hours, setHours] = useState(0)

	const timerPressedHandler = () => {
		if (isPaused) {
			startTimer()
		} else {
			pauseTimer()
		}
	}

	const startTimer = () => {
		setStartTime(Date.now())
		setIsPaused(false)
	}

	const pauseTimer = () => {
		setElapsedTime(getCurrentTime())
		setIsPaused(true)
	}

	const incerementTimer = () => {
		const currentTime = getCurrentTime()
		const currentSeconds = Math.floor(currentTime / 1000) % 60

		if (currentSeconds == seconds) return

		setSeconds(currentSeconds)
		setMinutes(Math.floor((currentTime / 1000 / 60) % 60))
		setHours(Math.floor(currentTime / 1000 / 60 / 60))
	}

	const resetTimer = () => {
		setIsPaused(true)
		setElapsedTime(0)
	}

	const getCurrentTime = (): number => {
		return Date.now() - startTime + elapsedTime
	}

	useEffect(() => {
		if (isPaused) return
		const interval = setInterval(incerementTimer, 50)

		return () => clearInterval(interval)
	}, [isPaused])

	return (
		<>
			<Button onPress={timerPressedHandler}>Start Timer</Button>
			<Text>Test Item</Text>
			<Text>
				{hours.toString().padStart(2, '0')} : {minutes.toString().padStart(2, '0')} :{' '}
				{seconds.toString().padStart(2, '0')}
			</Text>
			<Button onPress={resetTimer}>Reset Timer</Button>
		</>
	)
}
