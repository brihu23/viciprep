from django import template
register = template.Library()

@register.filter
def range(start, stop):
	return range(start, stop)
