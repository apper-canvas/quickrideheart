import { format, formatDistanceToNow, isToday, isYesterday, parseISO } from 'date-fns'

export const formatDate = (date) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  
  if (isToday(parsedDate)) {
    return `Today at ${format(parsedDate, 'h:mm a')}`
  }
  
  if (isYesterday(parsedDate)) {
    return `Yesterday at ${format(parsedDate, 'h:mm a')}`
  }
  
  return format(parsedDate, 'MMM d, yyyy')
}

export const formatRelativeTime = (date) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(parsedDate, { addSuffix: true })
}

export const formatTime = (date) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, 'h:mm a')
}

export const formatDateInput = (date) => {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date
  return format(parsedDate, 'yyyy-MM-dd')
}

export const isValidDate = (dateString) => {
  try {
    const date = parseISO(dateString)
    return !isNaN(date.getTime()) && date >= new Date()
  } catch {
    return false
  }
}