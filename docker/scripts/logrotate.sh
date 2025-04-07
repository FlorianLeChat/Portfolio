#!/bin/sh

echo "Copying application.log to $(date +"%Y-%m-%d").log..."

# Go to logs directory
cd logs

# Copy content from source file to dated log file
cp "application.log" "$(date +"%Y-%m-%d").log"

# Clear the content of the source file
> "application.log"
echo "Source log has been cleared."

# Get list of .log files, excluding application.log
LOG_FILES=$(ls -1 *.log 2>/dev/null | grep -v "^application.log$")

# Count number of log files
LOG_COUNT=$(echo "$LOG_FILES" | wc -l)

echo "$LOG_COUNT log files found."

# Keep only the 14 newest by filename (sorted alphabetically, oldest first)
if [ "$LOG_COUNT" -gt 14 ]; then
	FILES_TO_DELETE=$(echo "$LOG_FILES" | sort | head -n $(($LOG_COUNT - 14)))

	echo "Deleting old log files:"

	for file in $FILES_TO_DELETE; do
		echo " - Deleting $file"
		rm -f "$file"
	done
else
	echo "No log files to delete. Keeping all $LOG_COUNT files."
fi

echo "Done."